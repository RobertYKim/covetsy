Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'],
           scope: 'public_profile,email',
           display: 'popup',
           image_size: 'square',
           secure_image_url: true
end
