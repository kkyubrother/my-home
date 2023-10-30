import "./MainPage.css";
import styled from "styled-components";
import { useState, useEffect } from "react";


const MyWeb = [
  {
        "title": "COCOA(카카오톡 데스크탑 클론 프로젝트)",
        "url": "https://cocoa.kesuna.com/",
        "color": "#fee500",
        "icon": "leaf-outline",
        status: "ok"
    }, {
        "title": "StudyRoom 관리프로그램",
        "url": "https://store.kesuna.com/",
        "color": "#7ed0ed",
        "icon": "storefront-outline",
        status: "ok"
    }, {
        "title": "Lecture with Note",
        "url": "https://lecture.kesuna.com",
        "color": "#7ed0ed",
        "icon": "leaf-outline",
        status: "ok"
    }, {
        title: "깃허브",
        url: "https://github.com/kkyubrother",
        color: "#000000",
        icon: "logo-github",
        status: "ok"
    }
]

const CustomAnchor = styled.a`
    --color: ${props => props.color && props.color}
`

const MainPage = () => {
    const [my, setMy] = useState(MyWeb);
    useEffect(() => {
        fetch("/my.json")
        .then(response => response.json())
        .then(data => setMy(data))
          .catch(e => console.error(e))
    }, [])
    const handleOnClickUser = () => {
        const anchor = document.createElement("a");
        anchor.rel = "noreferrer";
        anchor.referrerPolicy = "no-referrer";
        anchor.href = "https://github.com/kkyubrother";
        anchor.target = "_parent";
        anchor.click();
    }
    return (
    <div className="main">
        <div className="profile">
            <div className="imgBx" onClick={handleOnClickUser}>
                <img src="./img/my.jpg" alt="user" />
            </div>
        </div>
        <ul className="menu">
            {my.map(value => {
                if (value.type === "divider") return <li className="divider" key={"divider"}></li>
                const span_status_style = {color: value?.status === undefined ? "#708c98" : ((value?.status === "ok")?"#32CD32" : "#DC143C")};
                const icon_name = value?.status === undefined ? "help-circle-outline" : ((value?.status === "ok")?"checkbox-outline" : "alert-circle-outline");
                return (<li key={value.url}>
                    <CustomAnchor href={value.url} color={value.color}>
                        <span className="icon" style={{color: value.color}}><ion-icon name={value.icon} size="large"></ion-icon></span>
                        <span className="text">{value.title}</span>
                        <span className="icon status" style={span_status_style}><ion-icon name={icon_name} size="large"></ion-icon></span>
                    </CustomAnchor>
                </li>)
            })}
        </ul>
    </div>
    )
}

export default MainPage;