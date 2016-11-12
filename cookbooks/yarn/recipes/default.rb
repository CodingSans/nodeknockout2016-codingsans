execute "Install yarn" do
    action :run
    command "npm install -g yarn"
    not_if do
      File.exist?('/usr/local/bin/yarn')
    end
end
