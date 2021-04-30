# lib/tasks/acxiom_parser.rake

require 'csv'

namespace :acxiom_parser do
  desc "This task parses acxiom from a csv"

  task :parse, [:file] do |task, args|
    csv = CSV.read(args.file)
    acxiom = {}
    acxiom_kv = {}
    csv.each do |row|
      name = row[1]
      name.slice!("#{row[2]} ")
      names = name.split(' > ')
      current = acxiom
      current_name = ''
      names.each do |name|
        unless current[name]
          current[name] = {}
        end
        current = current[name]
        current_name = name
      end
      parent = name
      parent.slice!(" > #{current_name}")
      acxiom_kv[row[0]] = {
          name: current_name,
          provider:'Acxiom US',
          description: row[3]
      }

      unless parent == current_name
        acxiom_kv[row[0]][:parent] = parent
      end

      current['id'] = row[0]
      current['description'] = row[3]
    end
    File.write('./lib/data_providers/acxiom-data-nested.json', JSON.dump(build_nested_array(acxiom)))
    File.write('./lib/data_providers/acxiom-data-key-value.json', JSON.dump(acxiom_kv))
  end

  def build_nested_array(hash)
    unless hash
      return []
    end
    counter = 0
    output = []
    hash.each do |key, value|
      id = value.delete("id")
      description = value.delete("description")
      output[counter] = {
          value: id,
          label: key,
          description: description,
      }
      children = build_nested_array(value)
      if children.size > 0
        output[counter]["children"] = children
      end
      counter = counter+1
    end
    return output
  end
end