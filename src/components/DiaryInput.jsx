import React, { useState } from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;

const DiaryInput = ({ isLoading, onSubmit }) => {
    const [userInput, setUserInput] = useState("");
    //사용자의 인풋을 받아  상위 컴포넌트로 데이터를 전달
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };
    const handleClick = () => {
        onSubmit(userInput);
    };

    return (
        <div>
            <TextArea
                value={userInput}
                onChange={handleUserInput}
                placeholder="오늘 일어난 일들을 간단히 적어주세요."
            />
            <Button loading={isLoading} onClick={handleClick}>
                GPT 회고록을 작성해줘!
            </Button>
        </div>
    );
};

export default DiaryInput;
