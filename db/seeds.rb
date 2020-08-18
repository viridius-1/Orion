# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# Create default root_admin user

User.create!(
  first_name: 'Shane',
  last_name: 'Taylor',
  company: 'N/A',
  email: 'admin@theversion2.com',
  password: 'password',
  confirmed_at: Time.now,
  roles: :root_admin,
  user_type: 'agency'
)
