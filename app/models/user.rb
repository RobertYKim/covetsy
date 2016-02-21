class User < ActiveRecord::Base
  validates :email, :username, :password_digest, :session_token, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :password, length: { minimum: 6, allow_nil: true }

  has_one :shop

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_username_and_password(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.find_by_email_and_password(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    name = auth_hash[:info][:name].split(" ")
    lname = name[1]
    fname = name[0]
    username = fname + lname + SecureRandom::urlsafe_base64

    user = User.find_by(provider: provider, uid: uid)
    return user if user

    user = User.create!(
      provider: provider,
      uid: uid,
      first_name: fname,
      last_name: lname,
      email: auth_hash[:info][:email],
      username: username,
      password: SecureRandom::urlsafe_base64,
      image: auth_hash[:info][:image]
    )
  end

  def self.generate_session_token
    session_token = SecureRandom.urlsafe_base64

    while User.exists?(session_token: session_token)
      session_token = SecureRandom.urlsafe_base64
    end

    session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
