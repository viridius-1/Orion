# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities

    return unless user&.company

    if user.advertiser_user?
      can :read, Advertiser, id: user.company.id
      can :manage, Campaign, advertiser_id: user.company.id
      can :manage, Objective, campaign: { advertiser_id: user.company.id }
      cannot :read, Agency
    elsif user.agency_user?
      can :manage, Advertiser, agency_id: user.company.id
      can :manage, Campaign, advertiser: { agency_id: user.company.id }
      can :manage, Objective, campaign: { advertiser: { agency_id: user.company.id } }
      can :read, Agency, id: user.company.id
    end

    can :new, Campaign
    can [:read, :update], User, id: user.id
  end
end
