# Create Agency && Agency's User
agency = Agency.create!(name: 'First Agency')

agency_user = User.create!(first_name: 'First',
                           last_name: 'Agency',
                           email: 'first@agency.com',
                           password: 'password',
                           confirmed_at: Time.now)

CompanyMember.create!(company_id: agency.id,
                      company_type: 'Agency',
                      user_id: agency_user.id,
                      roles: 'user')

# Create Advertiser && Advertiser's User
adv = Advertiser.create!(name: 'First Advertiser')

adv_user = User.create!(first_name: 'First',
                        last_name: 'Advertiser',
                        email: 'first@advertiser.com',
                        password: 'password',
                        confirmed_at: Time.now)

CompanyMember.create!(company_id: adv.id,
                      company_type: 'Advertiser',
                      user_id: adv_user.id,
                      roles: 'user')

# Create Interal Admin
Admin.create!(first_name: 'Admin',
              last_name: 'Version 2',
              password: 'overlordorion',
              email: 'admin@theversion2.com')
