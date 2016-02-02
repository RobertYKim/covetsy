# Users
User.destroy_all
guest = User.create!(
  first_name: "Dev",
  last_name: "Eloper",
  username: "guest",
  email: "guest@gmail.com",
  password: "password"
)
