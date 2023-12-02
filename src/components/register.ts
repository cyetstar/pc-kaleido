/*
 * @Author: gongxiaofei
 * @Date: 2022-08-16 13:06:36
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-09 09:43:13
 * @Description:
 */
import type { App } from "vue";
import {
  Layout,
  Button,
  Input,
  Checkbox,
  Form,
  Table,
  Dropdown,
  Menu,
  Tree,
  Row,
  Col,
  Space,
  Popconfirm,
  Modal,
  Pagination,
  PageHeader,
  Select,
  Radio,
  Upload,
  Cascader,
  Avatar,
  Anchor,
  Image,
  Card,
  Tabs,
  Collapse,
  InputNumber,
  Switch,
  TimePicker,
  DatePicker,
  Rate,
  Slider,
  Divider,
  Spin,
  Tag,
  Empty,
  Popover,
  Steps,
  Drawer,
  Tooltip,
  Timeline,
  Affix,
  AutoComplete,
} from "ant-design-vue";

import {
  HButton,
  HButtonDelete,
  HCheckbox,
  HCol,
  HDatePicker,
  HFormModal,
  HFormSearch,
  HInput,
  HInputGmsfhm,
  HInputPassword,
  HInputTel,
  HModalExport,
  HModuleTitle,
  HRadio,
  HSelect,
  HSelectSsxq,
  HTableData,
  HUploadImage,
} from "hta-ui";

// import HButton from "@/components/common/Button";
// import HButtonDelete from "@/components/common/ButtonDelete";
// import HButtonUpdate from "@/components/common/ButtonUpdate";
// import HCheckbox from "@/components/common/CheckBox";
// import HCol from "@/components/common/Col";
// import HFormModal from "@/components/common/FormModal";
// import HFormSearch from "@/components/common/FormSearch";
// import HGlobalConfig from "@/components/common/GlobalConfig";
// import HInput from "@/components/common/Input";
// import HInputGmsfhm from "@/components/common/InputGmsfhm";
// import HInputPassword from "@/components/common/InputPassword";
// import HInputTel from "@/components/common/InputTel";
// import HModalExport from "@/components/common/ModalExport";
// import HPlexImage from "@/components/common/PlexImage";
// import HPlexLink from "@/components/common/PlexLink";
// import HRadio from "@/components/common/Radio";
// import HSelect from "@/components/common/Select";
// import HSelectSsxq from "@/components/common/SelectSsxq";
// import HTableData from "@/components/common/TableData";
// import HTitleModule from "@/components/common/TitleModule";
// import HUploadImage from "@/components/common/UploadImage";
// import HDatePicker from "@/components/common/DatePicker";

import GlobalConfig from "@/components/GlobalConfig";
import PlexImage from "@/components/PlexImage";
import LogoLink from "@/components/LogoLink";

export const registerGlobComp = (app: App) => {
  app
    .component("h-button", HButton)
    .component("h-button-delete", HButtonDelete)
    .component("h-checkbox", HCheckbox)
    .component("h-col", HCol)
    .component("h-date-picker", HDatePicker)
    .component("h-form-modal", HFormModal)
    .component("h-form-search", HFormSearch)
    .component("h-input", HInput)
    .component("h-input-gmsfhm", HInputGmsfhm)
    .component("h-input-password", HInputPassword)
    .component("h-input-tel", HInputTel)
    .component("h-modal-export", HModalExport)
    .component("h-module-title", HModuleTitle)
    .component("h-radio", HRadio)
    .component("h-select", HSelect)
    .component("h-select-ssxq", HSelectSsxq)
    .component("h-table-data", HTableData)
    .component("h-upload-image", HUploadImage)

    .component("k-global-config", GlobalConfig)
    .component("k-plex-image", PlexImage)
    .component("k-logo-link", LogoLink)
    .use(Layout)
    .use(Button)
    .use(Input)
    .use(Checkbox)
    .use(Form)
    .use(Table)
    .use(Dropdown)
    .use(Menu)
    .use(Tree)
    .use(Row)
    .use(Col)
    .use(Space)
    .use(Popconfirm)
    .use(Modal)
    .use(Pagination)
    .use(PageHeader)
    .use(Select)
    .use(Radio)
    .use(Upload)
    .use(Cascader)
    .use(Avatar)
    .use(Anchor)
    .use(Image)
    .use(Card)
    .use(Tabs)
    .use(Collapse)
    .use(InputNumber)
    .use(Switch)
    .use(TimePicker)
    .use(DatePicker)
    .use(Rate)
    .use(Slider)
    .use(Divider)
    .use(Spin)
    .use(Tag)
    .use(Empty)
    .use(Popover)
    .use(Steps)
    .use(Drawer)
    .use(Tooltip)
    .use(Timeline)
    .use(Affix)
    .use(AutoComplete);
};
