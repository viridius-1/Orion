# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_01_224217) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "advertisers", force: :cascade do |t|
    t.string "company_name"
    t.string "website"
    t.integer "user_id"
    t.string "industry"
    t.integer "client_count"
    t.string "preferred_service_level"
    t.string "customer_target"
    t.string "monthly_unique_visitors"
    t.decimal "average_order_value"
    t.decimal "conversion_rate"
    t.decimal "cost_per_acquisition"
    t.string "current_media_mix"
    t.integer "age_range_start"
    t.integer "age_range_end"
    t.text "gender"
    t.text "household_income"
    t.text "parental_status"
    t.text "education"
    t.text "language"
    t.text "affinity"
    t.boolean "is_agency"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "audiences", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "provider"
    t.integer "category_id"
    t.index ["category_id"], name: "index_audiences_on_category_id"
  end

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.date "flight_start_date"
    t.date "flight_end_date"
    t.string "goal"
    t.string "kpi"
    t.decimal "cpa_goal"
    t.integer "roas_goal"
    t.decimal "budget"
    t.string "geography"
    t.string "audience_targeting"
    t.integer "advertiser_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "category_id"
    t.boolean "has_audience"
    t.index ["category_id"], name: "index_categories_on_category_id"
  end

  create_table "connections", force: :cascade do |t|
    t.integer "user_id"
    t.string "token"
    t.datetime "expired_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "audience_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["audience_id"], name: "index_favorites_on_audience_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "company"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "roles"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.string "user_type"
    t.boolean "profile_created", default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_users_on_invitations_count"
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by_type_and_invited_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "favorites", "audiences"
  add_foreign_key "favorites", "users"
end
