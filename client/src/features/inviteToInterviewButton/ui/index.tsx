import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Button, Popover, Input, InputRef, Typography, Space } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { UserAddOutlined, CopyOutlined } from '@ant-design/icons'
import { InterviewModel } from '../../../entities/interview';


export type InviteToInterviewButtonProps = ButtonProps & {
  interviewId: InterviewModel['id'];
};

export const InviteToInterviewButton = (props: InviteToInterviewButtonProps) => { 
  const { interviewId, ...rest } = props;
  const url = new URL(`/interviews/${interviewId}`, window?.location.origin).toString();
  const inputRef = useRef<InputRef>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClickButton = useCallback(async () => {
    if (inputRef === null || inputRef.current === null || inputRef.current.input === null) return;
    const text = inputRef.current.input.value;
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  const popoverConvent = useMemo(() => (
    <Space direction='vertical'>
      <p>Скопируйте ссылку ниже <br />и поделитесь ей с другими людьми.</p>
      <Space.Compact block>
        <Input ref={inputRef} value={url} />
        <Button onClick={handleClickButton} ><CopyOutlined /></Button>
      </Space.Compact>
      {isCopied ? <Typography.Text type="success">Успешно скопировано!</Typography.Text>: null}
    </Space>
  ), [handleClickButton, url, isCopied]);
  
  useEffect(() => {
    if (isCopied) setTimeout(() => setIsCopied(false), 2000)
  }, [isCopied]);
  
  return (
    <Popover content={popoverConvent}>
      <Button type="text" icon={<UserAddOutlined />} {...rest}>Пригласить</Button>
    </Popover>
  )
}