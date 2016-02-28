require 'rails_helper'

describe Country do
  it { should validate_presence_of(:name) }
end
