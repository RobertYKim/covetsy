require 'rails_helper'

describe Language do
  it { should validate_presence_of(:name) }
end
