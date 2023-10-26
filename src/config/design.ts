/*
 * @Author: gongxiaofei
 * @Date: 2022-08-11 14:15:27
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-04-24 15:25:45
 * @Description:
 */
import { defineDesignerConfig } from "./utils";
export default defineDesignerConfig({
  WidgetTabs: {
    componentLib: "组件库",
    formLib: "表单模板",
  },
  WidgetCollapse: {
    standardFields: "标准字段",
    basicFields: "基础控件",
  },
  WidgetLabel: {
    input: "单行输入",
    textarea: "多行输入",
    number: "数字输入",
    radio: "单选项",
    checkbox: "多选项",
    select: "下拉选项",
    time: "时间",
    timeRange: "时间范围",
    date: "日期",
    dateRange: "日期范围",
    switch: "开关",
    rate: "评分",
    slider: "滑块",
    staticText: "文字",
    button: "按钮",
    divider: "分隔线",
    pictureUpload: "图片",
    fileUpload: "文件",
    cascader: "级联选择",
  },
  ToolbarPanel: {
    confirm: "提交",
    preview: "预览",
    clear: "清空",
    undoHint: "撤销",
    redoHint: "重做",
    saveDraft: "存为草稿",
    pcLayout: "PC",
    padLayout: "Pad",
    mobileLayout: "H5",
  },
  FormWidget: {
    containerEmpty: "从左侧拖拽来添加字段",
  },
  SettingTabs: {
    formSetting: "表单属性设置",
    widgetSetting: "组件属性设置",
  },
  SettingForm: {
    formName: "表单名称：",
    formNamePlaceholder: "请输入表单名称",
    ssyy: "所属应用：",
    gzdbsf: "根字段",
    gzdbsfPlaceholder: "请选择根字段",
    ssyyPlaceholder: "请选择所属应用",
    labelPosition: "标签位置：",
    leftPosition: "左侧",
    topPosition: "顶部",
    labelAlign: "标签对齐：",
    leftAlign: "居左",
    rightAlign: "居右",
    labelWidth: "标签宽度(px)：",
    labelWidthPlaceholder: "请输入标签宽度",
    formAttr: "表单属性：",
    hideRequiredMark: "隐藏必选标记",
  },
  FieldSetting: {
    name: "字段名称：",
    namePlaceholder: "请输入字段名称",
    label: "标签名称：",
    labelPlaceholder: "请输入标签名称",
    labelWidth: "标签宽度：",
    labelWidthPlaceholder: "请输入标签宽度",
    type: "输入类型",
    typePlaceholder: "请选择输入类型",
    defaultValue: "默认值：",
    defaultValuePlaceholder: "请输入默认值",
    placeholder: "占位内容：",
    placeholderPlaceholder: "请输入占位内容",
    allowClear: "是否展示清空：",
    required: "是否必填：",
    readonly: "是否只读",
    isHiddenFields: "是否作为隐藏字段",
    regValidator: "校验规则（正则）",
    regValidatorPlaceholder: "请选择校验规则",
    errorMsg: "错误提示：",
    errorMsgPlaceholder: "请输入错误提示",
    rows: "行数：",
    rowsPlaceholder: "请输入行数",
    showCount: "是否展示字数：",
    maxlength: "最大字数：",
    maxlengthPlaceholder: "请输入最大字数",
    max: "最大值：",
    maxPlaceholder: "请输入最大值",
    min: "最小值：",
    minPlaceholder: "请输入最小值",
    precision: "数值精度：",
    precisionPlaceholder: "请输入数值精度",
    step: "步长：",
    stepPlaceholder: "请输入步长",
    optionType: "选项样式：",
    optionTypePlaceholder: "请选择选项样式",
    dictType: "选项设置：",
    dictTypePlaceholder: "请选择选项设置",
    dictSelect: "字典选择",
    dictSelectPlaceholder: "请选择字典",
    options: "选项配置：",
    dataInterface: "数据接口：",
    mode: "是否多选：",
    format: "显示格式：",
    formatPlaceholder: "请选择显示格式",
    startPlaceholder: "起始占位内容：",
    startPlaceholderPlaceholder: "请输入起始占位内容",
    endPlaceholder: "结束占位内容：",
    endPlaceholderPlaceholder: "请输入结束占位内容",
    checkedChildren: "选中时的内容：",
    checkedValue: "选中时的值：",
    unCheckedChildren: "非选中时的内容：",
    unCheckedValue: "非选中时的值：",
    allowClears: "是否允许再次点击后清除：",
    allowHalf: "是否允许半选：",
    count: "star数量：",
    buttonText: "按钮文字：",
    buttonType: "按钮类型：",
    shape: "按钮形状：",
    size: "按钮大小：",
    dashed: "是否为虚线：",
    orientation: "分割线标题的位置：",
    dividerType: "分割线类型：",
    maxCount: "最大上传数量：",
    maxCountPlaceholder: "请输入最大上传数量",
    multiple: "是否支持多选：",
    displayControl: "自定义显示规则",
    isKeyAssociation: "是否使用输入词联想",
  },
});
