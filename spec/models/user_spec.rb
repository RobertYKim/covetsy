require 'rails_helper'

describe User do
  describe "Presence validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
  end

  describe "Uniqueness validations" do
    subject { User.new(email: "john@gmail.com", username: "John", password_digest: "a", session_token: "a") }
    it { should validate_uniqueness_of(:email) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe "Length validations" do
    it { should validate_length_of(:username).is_at_least(4) }
    it { should validate_length_of(:password).is_at_least(6).on(:create) }
  end

  describe "Associations" do
    it { should have_one(:shop) }
  end

  describe "::find_by_username_and_password" do
    before(:each) do
      @user = User.create(
        email: "john@gmail.com",
        username: "John",
        password: "password",
        session_token: "a"
      )
    end

    it "returns the correct user given a username and password" do
      result = User.find_by_username_and_password(@user.username, @user.password)
      expect(result).to eq(@user)
    end
  end

  describe "::find_by_email_and_password" do
    before(:each) do
      @user = User.create(
        email: "john@gmail.com",
        username: "John",
        password: "password",
        session_token: "a"
      )
    end

    it "returns the correct user given a email and password" do
      result = User.find_by_email_and_password(@user.email, @user.password)
      expect(result).to eq(@user)
    end
  end

  describe "::find_or_create_by_auth_hash" do
    before(:each) do
      @existingUser = User.create(
        provider: "facebook",
        uid: "facebook",
        email: "john@gmail.com",
        username: "John",
        password: "password",
        session_token: "a"
      )
    end

    it "returns the correct user given a provider and uid" do
      auth_hash = {provider: "facebook", uid: "facebook", info: {name: "John Doe"} }
      result = User.find_or_create_by_auth_hash(auth_hash)
      expect(result).to eq(@existingUser)
    end

    it "creates a user if not found" do
      auth_hash = {provider: "google", uid: "google", info: {name: "Jane Smith", email: "jane@gmail.com", image: ""} }
      result = User.find_or_create_by_auth_hash(auth_hash)
      expect(User.all.count).to eq(2)
    end
  end

  describe "::generate_session_token" do
    existingToken = SecureRandom.urlsafe_base64
    before(:each) do
      @user = User.create(
        email: "john@gmail.com",
        username: "John",
        password: "password",
        session_token: existingToken
      )
    end

    it "returns a session token that is not already in use" do
      newToken = User.generate_session_token
      expect(newToken).to_not eq(@user.session_token)
    end
  end

  describe "#password=" do
    before(:each) do
      @user = User.create(
        email: "john@gmail.com",
        username: "John",
        password: "password",
        session_token: "a"
      )
      @user.password = "newpassword"
    end

    it "sets the instance variable @password" do
      expect(@user.password).to eq("newpassword")
    end

    it "sets an attribute password_digest" do
      expect(@user.password_digest).to_not be_nil
    end

    it "stored password_digest is not the same as the password" do
      expect(@user.password_digest).to_not eq(@user.password)
    end
  end
end
