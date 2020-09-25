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

ActiveRecord::Schema.define(version: 2020_09_25_132650) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "payments", force: :cascade do |t|
    t.integer "sponsor_id"
    t.integer "project_id"
    t.integer "amount_paid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "project_comments", force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "projects", force: :cascade do |t|
    t.integer "project_submitter_id"
    t.integer "project_developer_id"
    t.string "project_name"
    t.string "project_problem_statement"
    t.string "project_idea_summary"
    t.boolean "is_claimed", default: false, null: false
    t.string "project_start_date"
    t.string "project_end_date"
    t.boolean "project_started", default: false, null: false
    t.boolean "in_progress", default: false, null: false
    t.boolean "completed", default: false, null: false
    t.boolean "abandoned", default: false, null: false
    t.string "abandoned_date"
    t.boolean "archived", default: false, null: false
    t.string "archived_date"
    t.integer "num_up_votes"
    t.integer "num_down_votes"
    t.string "sponsor_amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_saved_projects", force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.integer "claimed_by_id"
    t.boolean "claimed", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "github"
    t.string "website"
    t.string "other_links"
    t.boolean "is_developer", default: false, null: false
    t.boolean "is_sponsor", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "nickname"
  end

end
