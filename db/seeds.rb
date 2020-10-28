# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# Create Agency && Agency's User
agency = Agency.create!(name: 'First Agency')

agency_user = User.create!(first_name: 'First',
                           last_name: 'Agency',
                           email: 'first@agency.com',
                           password: 'password',
                           confirmed_at: Time.now)

CompanyMember.create!(company_id: agency.id, company_type: agency.class, user_id: agency_user.id)

# Create Advertiser && Advertiser's User
adv = Advertiser.create!(name: 'First Advertiser')

adv_user = User.create!(first_name: 'First',
                        last_name: 'Advertiser',
                        email: 'first@advertiser.com',
                        password: 'password',
                        confirmed_at: Time.now)

CompanyMember.create!(company_id: adv.id, company_type: adv_user.class, user_id: adv_user.id)

# Create Interal Admin
Admin.create!(first_name: 'Admin',
              last_name: 'Version 2',
              password: 'overlordorion',
              email: 'admin@theversion2.com')
