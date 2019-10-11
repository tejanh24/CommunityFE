import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

//ADDED BY PULIRANGADU

 const Bots = React.lazy(() => import('./components/bots/bots'));
 const SNOWBotConfig = React.lazy(() => import('./components/bots/snowbotconfig'));
 const HRBotConfig = React.lazy(() => import('./components/bots/hrbotconfig'));
 //const EditHRBotConfig = React.lazy(() => import('./components/bots/edithrbotconfig'));
 const SAPBotConfig = React.lazy(() => import('./components/bots/sapbotconfig'));
// const EditSAPBotConfig = React.lazy(() => import('./components/bots/editsapbotconfig'));
 const RPABotConfig = React.lazy(() => import('./components/bots/rpabotconfig'));
 //const EditSNOWBotConfig = React.lazy(() => import('./components/bots/editsnowbotconfig'));

 const Sampledemo = React.lazy(() => import('./components/bots/sampledemo'));

 const Channels = React.lazy(() => import('./components/channels/channels'));
 const EditChannels = React.lazy(() => import('./components/channels/editchannels'));

 const HRchannels = React.lazy(() => import('./components/channels/hrchannels'));
 const EditHRchannels = React.lazy(() => import('./components/channels/edithrchannels'));
 const Snowchannels = React.lazy(() => import('./components/channels/snowchannels'));
 const EditSnowchannels = React.lazy(() => import('./components/channels/editsnowchannels'));

 const BotServices = React.lazy(() => import('./components/botservices/botservices'));
 const SAPBotServices = React.lazy(() => import('./components/botservices/sapbotservices'));
 const HRBotServices = React.lazy(() => import('./components/botservices/hrbotservices'));
 const EditHRBotServices = React.lazy(() => import('./components/botservices/edithrbotservices'));
 const SNOWBotServices = React.lazy(() => import('./components/botservices/snowbotservices'));
 const EditSNOWBotServices= React.lazy(() => import('./components/botservices/editsnowbotservices'));
 const EditSAPBotServices = React.lazy(() => import('./components/botservices/editsapbotservices'));

 const BotAssetServices = React.lazy(() => import('./components/botassetservices/botassetservices'));

 const Help = React.lazy(() => import('./components/help/help'));
 const Settings = React.lazy(() => import('./components/settings/settings'));
 const UserGroups = React.lazy(() => import('./components/usergroups/usergroups'));
 const Monitor = React.lazy(() => import('./components/monitor/monitor'));
 const PrivateBotServices = React.lazy(() => import('./components/privatebotservices/privatebotservices'));
 const Convo2Bot = React.lazy(() => import('./components/convo2bot/convo2bot'));
 const Forms2Bot = React.lazy(() => import('./components/forms2bot/forms2bot'));
 const RpaBot = React.lazy(() => import('./components/rpabot/rpabot'));

 const GroupBotList = React.lazy(() => import('./components/bots/groupbotlist'));
 const configuregroupbot = React.lazy(() => import('./components/bots/configuregroupbot'));
 const editgroupbot = React.lazy(() => import('./components/bots/editgroupbot'));

// https:github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
 // { path: '/bots', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  

 // ADDED BY PULIRANGADU

   { path: '/bots', exact: true, name: 'Bots', component: Bots },
   { path: '/bots/config/snowbot', exact: true, name: 'SNOW Bot Config', component: SNOWBotConfig },
   { path: '/bots/config/hrbot', exact: true, name: 'HR Bot Config', component: HRBotConfig },
   { path: '/bots/config/sapbot', exact: true, name: 'SAP Bot Config', component: SAPBotConfig },
   { path: '/bots/config/rpabot', exact: true, name: 'RPA Bot Config', component: RPABotConfig },


   // { path: '/bots/config/edithrbot', exact: true, name: 'EDIT HR Bot Config', component: EditHRBotConfig },
  // { path: '/bots/config/editsnowbot', exact: true, name: 'EDIT SNOW Bot Config', component: EditSNOWBotConfig },
   //{ path: '/bots/config/editsapbot', exact: true, name: 'EDIT SAP Bot Config', component: EditSAPBotConfig },

   { path: '/bots/config/samplecode', exact: true, name: 'RPA Bot Config', component: Sampledemo },


   { path: '/bots/channels', exact: true, name: 'Channels', component: Channels },

   { path: '/bots/groupbot', exact: true, name: 'Group Bot', component: GroupBotList },

   { path: '/bots/configuregroupbot', exact: true, name: 'Group Bot', component: configuregroupbot },

   { path: '/bots/editgroupbot', exact: true, name: 'Edit Group Bot', component: editgroupbot },
 
   { path: '/bots/editchannels', exact: true, name: 'Channels', component: EditChannels },

   { path: '/bots/hrchannels', exact: true, name: 'HR Channels', component: HRchannels },
   { path: '/bots/edithrchannels', exact: true, name: 'EDIT HR Channels', component: EditHRchannels },

   { path: '/bots/snowchannels', exact: true, name: 'Snow Channels', component: Snowchannels },
   { path: '/bots/editsnowchannels', exact: true, name: 'EDIT Snow Channels', component: EditSnowchannels },

   { path: '/bots/channels/botservices', exact: true, name: 'Bot Services', component: BotServices },

   { path: '/bots/config/sapbotservices', exact: true, name: 'SAP Bot Services', component: SAPBotServices },
   { path: '/bots/config/editsapbotservices', exact: true, name: 'EDIT SAP Bot Services', component: EditSAPBotServices },

   { path: '/bots/config/hrbotservices', exact: true, name: 'HR Bot Services', component: HRBotServices },
   { path: '/bots/config/edithrbotservices', exact: true, name: 'EDIT HR Bot Services', component: EditHRBotServices },

   { path: '/bots/config/snowbotservices', exact: true, name: 'EDIT SNOW Bot Services', component: SNOWBotServices },
   { path: '/bots/config/editsnowbotservices', exact: true, name: 'EDIT SNOW Bot Services', component: EditSNOWBotServices },


   { path: '/botassetservices', exact: true, name: 'Bot Asset Services', component: BotAssetServices },

   { path: '/help', exact: true, name: 'Help', component: Help },
   { path: '/settings', exact: true, name: 'Settings', component: Settings },
   { path: '/usergroups', exact: true, name: 'User Groups', component: UserGroups },
   { path: '/monitor', exact: true, name: 'Monitor', component: Monitor },
   { path: '/privatebotservices', exact: true, name: 'Private Bot Services', component: PrivateBotServices },
   { path: '/convo2bot', exact: true, name: 'Conversation2Bot', component: Convo2Bot },
   { path: '/forms2bot', exact: true, name: 'Forms2Bot', component: Forms2Bot },
   { path: '/rpabot', exact: true, name: 'RpaBot', component: RpaBot },

  { path: '/groupbotlist', exact: true, name: 'Group Bot Feature ', component: GroupBotList },
  { path: '/configuregroupbot', exact: true, name: 'Group Bot Feature ', component: configuregroupbot },
  { path: '/editgroupbot/:group_id', exact: true, name: 'GroupBot Feature ', component: editgroupbot },
 
  
];

export default routes;
