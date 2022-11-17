#New line added for testing purpose of PULL REQUEST IN GITHUB
terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.5.0"
    }
  }
}

# Configure the MongoDB Atlas Provider 
provider "mongodbatlas" {
  public_key = "wqbwrnep"
  private_key  = "9353d390-2dd2-4435-bb82-a2f49af28b45"
  #is_mongodbgov_cloud = true
}
# Create the resources


resource "mongodbatlas_cluster" "test" {
  project_id   = "6373fcc87dee80263c4b6b34"
  name         = "terraform-template"
  cluster_type = "REPLICASET"
   #replication_specs {
   #  num_shards = 1
   #  regions_config {
   #    region_name     = "US_EAST_2"
   #   electable_nodes = 3
   #   priority        = 7
   #   read_only_nodes = 0
   #  }
   #}
  cloud_backup     = false
  auto_scaling_disk_gb_enabled = false
  mongo_db_major_version       = "5.0"

  # Provider Settings "block"
  provider_name         = "TENANT"
  backing_provider_name = "AZURE"
  #provider_disk_type_name     = "P4"
  provider_instance_size_name = "M0"
  provider_region_name = "US_EAST_2"
}
