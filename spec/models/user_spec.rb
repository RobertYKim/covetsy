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
end
