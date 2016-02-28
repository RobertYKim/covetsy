require 'rails_helper'

describe Currency do
  it { should validate_presence_of(:name) }
end
