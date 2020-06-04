require 'figaro'

# Determine environment
environment = ENV.fetch('RAILS_ENV') { 'development' }
app_root_dir = ENV.fetch('ROOT_DIR') { Dir.pwd }

# Load figaro
Figaro.application = Figaro::Application.new(
  environment: environment,
  path: "#{app_root_dir}/config/application.yml"
)
Figaro.load

max_threads_count = ENV.fetch('RAILS_MAX_THREADS') { 5 }
min_threads_count = ENV.fetch('RAILS_MIN_THREADS') { max_threads_count }

threads min_threads_count, max_threads_count

# Specifies the `port` that Puma will listen on to
# receive requests; default is 3000.
port ENV.fetch('PORT') { 3000 }

# Specifies the `environment` that Puma will run in.
environment(environment)

plugin :tmp_restart

if environment == 'production'
  pidfile "#{app_root_dir}/tmp/pids/puma.pid"
  state_path "#{app_root_dir}/tmp/pids/puma.state"
  bind "unix://#{app_root_dir}/tmp/sockets/puma.sock"
  stdout_redirect "#{app_root_dir}/log/puma.stdout.log", "#{app_root_dir}/log/puma.stderr.log", true
end
