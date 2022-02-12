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

ActiveRecord::Schema.define(version: 2022_02_13_143025) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "advertisers", force: :cascade do |t|
    t.string "name"
    t.string "website_url"
    t.integer "user_id"
    t.string "industry"
    t.string "current_media_mix"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "agency_id"
    t.string "business_type"
    t.integer "annual_revenue"
    t.integer "monthly_unique_visitors"
  end

  create_table "agencies", force: :cascade do |t|
    t.string "name"
    t.text "website"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.string "campaign_url"
    t.string "geography"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "coversion_rate"
    t.integer "advertiser_id"
    t.integer "age_range_male", array: true
    t.integer "age_range_female", array: true
    t.integer "household_income", array: true
    t.jsonb "affinities"
    t.integer "status", default: 0, null: false
    t.string "languages"
    t.integer "budget_used"
    t.string "geo_fence"
    t.boolean "footfall_analysis", default: false, null: false
    t.boolean "crm_data", default: false, null: false
    t.boolean "contextual_targeting", default: false, null: false
    t.boolean "brand_safety", default: false, null: false
    t.text "targeting_notes"
    t.integer "campaign_type", default: 0, null: false
  end

  create_table "connections", force: :cascade do |t|
    t.integer "user_id"
    t.string "token"
    t.datetime "expired_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "objectives", force: :cascade do |t|
    t.string "goal"
    t.string "kpi"
    t.decimal "impressions"
    t.decimal "frequency"
    t.decimal "unique_reach"
    t.decimal "target_ctr"
    t.decimal "video_plays"
    t.decimal "video_completion_rate"
    t.decimal "conversions"
    t.decimal "target_conversion_rate"
    t.decimal "target_cpa"
    t.decimal "average_order_value"
    t.decimal "target_roas"
    t.decimal "budget"
    t.date "start_date"
    t.date "end_date"
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "pixel_notes"
    t.string "media_channel"
    t.index ["campaign_id"], name: "index_objectives_on_campaign_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
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
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.boolean "profile_created", default: false
    t.string "roles"
    t.integer "company_id"
    t.string "company_type"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_users_on_invitations_count"
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by_type_and_invited_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "objectives", "campaigns"
end
