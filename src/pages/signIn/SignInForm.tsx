import React from "react";
import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks"
import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
export const SignInForm: React.FC = () => {

  
  const loading = useSelector(state => state.user.loading)
  const error = useSelector( state => state.user.error)
  const jwt = useSelector( state => state.user.token)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
      if(jwt !== null){
          navigate("/");
      }

  },[jwt])  // 一旦 jwt 发生变化，就重定向到主页中


  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(signIn({
        email:values.username,
        password: values.password,

    }))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
          {/* 发送登录请求的时候，页面也需要缓冲转一转，antd 提供的loading属性可以做到，loading={loading}使用哦我们自己定义的loading即可 */}
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
