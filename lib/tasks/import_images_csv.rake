require 'csv'
namespace :import_images_csv do
  task :import_images => :environment do
    csv_text = File.read('/home/shadman/iisl-app/db/images.csv')
	csv = CSV.parse(csv_text, :headers => true)
	csv.each do |row|
		Image.create!(row.to_hash)
	end
  end
end 