// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");

import "bootstrap";

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import ReactOnRails from "react-on-rails";

import CampaignNew from "../bundles/Campaign/New";
import CampaignDetailsComponent from "../bundles/Campaign/CampaignDetailsComponent.jsx";
import CampaignIndexComponent from "../bundles/Campaign/CampaignIndexComponent.jsx";
import AdvertiserForm from "../bundles/Advertiser/AdvertiserForm.jsx";
import AgencyDashboardComponent from "../bundles/Dashboard/AgencyDashboardComponent";
import LinkDropdownMenu from "../components/LinkDropdownMenu";
import LinkButton from "../components/LinkButton";

ReactOnRails.register({
    CampaignNew,
    AgencyDashboardComponent,
    LinkDropdownMenu,
    CampaignIndexComponent,
    CampaignDetailsComponent,
    LinkButton,
    AdvertiserForm
});
