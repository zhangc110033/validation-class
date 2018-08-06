# validation-class
```validation for class```
## Install
```npm i validation-class```
```npm i babel-plugin-transform-decorators-legacy```

## Example
formValid.js
```JAVASCRIPT
import React from 'react'
import { Form, Row, Col, Select, Button, Input } from 'antd'
import { observer } from "mobx-react"
const FormItem = Form.Item
const Option = Select.Option
import Store from './formValidStore'

@observer
export default class extends React.Component {

    componentWillMount() {
        this.store = new Store()
        setTimeout(() => { this.store.ready = true }, 2000)
    }

    render() {
        console.info("render")
        let config = {
            labelCol: {
                span: 12
            },
            hasFeedback: true,
            wrapperCol: {
                span: 12
            }
        }
        let valid = this.store.getValidation()
        return (
            <Form style={{ padding: "100px 0 0 100px" }}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Button disabled={!valid.classValid}>提交</Button>
                    </Col>
                    <Col span={6}>
                        <FormItem label="楼盘"{...config}
                            validateStatus={valid.resblock.valid == true ? "success" : "error"}
                            help={valid.resblock.help}>
                            <Input onChange={e => this.store.resblock = e.target.value} />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="楼幢" {...config}
                            validateStatus={valid.building.valid == true ? "success" : "error"}
                            help={valid.building.help}>
                            <Input onChange={e => this.store.building = e.target.value} />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="单元" {...config}
                            validateStatus={valid.unit.valid == true ? "success" : "error"}
                            help={valid.unit.help}>
                            <Select mode="multiple"
                                onChange={e => this.store.unit = e}>
                                <Option value="jack1">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}
```
formValidStore.js
```JAVASCRIPT
import { observable } from 'mobx'
import { fieldValid, classValid } from './validation-class'

@classValid({
    switcher: target => {
        return target.ready == true
    }
})
export default class {

    @observable ready = false

    @observable @fieldValid({
        require: true, help: "不可为空", validator: (value, target, result) => {
            if (target.building == "123") {
                result.valid = true
                result.help = ""
            } else {
                result.valid = false
                result.help = "楼栋必须是123"
            }
        }
    }) resblock

    @observable @fieldValid({ require: true, help: "不可为空且未数字", regex: /^[0-9]*$/ }) building

    @observable @fieldValid({ require: true, help: "不可为空" }) unit = []
}

```
## api
import
```JAVASCRIPT
import { fieldValid, classValid } from './validation-class'
```
decorator arguments
```JAVASCRIPT
@fieldValid({
  require: true, //field is require[boolean]
  help: "不可为空且未数字", //help message[string]
  regex: /^[0-9]*$/ //regex[regex]
})
```
