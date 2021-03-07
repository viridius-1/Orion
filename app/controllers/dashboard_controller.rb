# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    company_type = current_user.company_type.downcase.to_sym
    correct_paths = if company_type == :agency
                      agency_clients_path(agency_id: current_user.company.id)
                    elsif company_type == :advertiser
                      advertiser_campaigns_path(advertiser_id: current_user.company.id)
                    end

    redirect_to correct_paths
  end
end
