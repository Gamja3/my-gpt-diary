import { useState } from "react";
import { CallGPT } from "./api/gpt";
import DiaryInput from "./components/DiaryInput";
import styled from "styled-components";
import logo from "./assets/logo.png";
import DiaryDisplay from "./components/DiaryDisplay";
import { Button } from "antd";
import { Unsplash } from "./api/unsplash";
import axios from "axios";

const dummyData = JSON.parse(
    `{ "title": "코딩의 고난과 역경", 
    "thumbnail": "코딩", "summary": "코딩 강의를 듣고 프로젝트 버그로 고민하다가 gpt로 해결함.", 
    "emotional_content": "오늘은 코딩 강의를 듣고 프로젝트에서 버그가 많이 나왔다. 스택오버플로에서 검색해봤지만 해결되지 않아서 답답하기만 했어. 결국 마지막에는 gpt를 통해서 문제를 해결했는데, 이렇게 쉽게 해결하는 것이 내 개발 실력에 도움이 되는 건지 고민이 많이 되네.", "emotional_result": "이 일은 나에게 코딩에 대한 열정을 불어넣어 주었지만, 쉬운 해결책을 택한 것에 대한 내부적인 갈등을 보여준다. 내가 직면한 어려움을 극복하는 방법이 개발 실력 향상에 도움이 되는지 다시 한번 심층적으로 고민해봐야 할 것 같다.", "analysis": "이 사건은 개발자로서의 자아 정체성과 자부심에 대한 고민을 드러냅니다. '노력 없이 얻어지는 것은 없다(There is no substitute for hard work)' 라는 유명한 명언을 떠올려보면, 직면한 문제를 스스로 해결하고 극복하는 과정에서 발전할 수 있다는 것을 깨닫게 될 것입니다.", "action_list": ["개발 과제에 도전해보며 스스로 문제를 해결해본다.", "도전적인 프로젝트에 참여하여 새로운 기술을 배우고 성장한다.", "타인의 도움 없이도 스스로 노력하여 개발 실력을 향상시킨다."] }`
);
function App() {
    const [data, setData] = useState(dummyData);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPIcall = async (userInput) => {
        try {
            setIsLoading(true);
            const message = await CallGPT({
                prompt: `
                ${userInput}`,
            });
            setData(JSON.parse(message));
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    console.log("App", data);
    const handleSubmit = (userInput) => {
        console.log(userInput);
        handleClickAPIcall(userInput);
    };

    const searchImages = async () => {
        try {
            const response = await axios.get(
                `https://api.unsplash.com/search/photos?query=${"apple"}&client_id=${
                    import.meta.env.VITE_UNSPLASH_ACCESS_KEY
                }`
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };
    const handleClickAPIUnsplash = async () => {
        console.log("handleClickAPIUnsplash");
        Unsplash();
        searchImages();
    };
    return (
        <AppContainer>
            <AppTitle>
                심리상담사 GPT, AI 회고록{" "}
                <img width={"100px"} src={logo} alt="logo" />
            </AppTitle>
            <Button onClick={handleClickAPIUnsplash}></Button>
            <DiaryInput isLoading={isLoading} onSubmit={handleSubmit} />
            <DiaryDisplay isLoading={isLoading} data={data} />
        </AppContainer>
    );
}

export default App;

const AppTitle = styled.div`
    width: 100%;
    font-weight: 400;
    font-size: 35px;
    text-align: center;
    font-family: "Noto Serif KR";
`;

const AppContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
`;
