import "./MainPage.css";
import styled from "styled-components";
import {useState, useEffect} from "react";


const MyWeb = [{
  "title": "COCOA(카카오톡 데스크탑 클론 프로젝트)",
  "url": "https://cocoa.kesuna.com/",
  // "color": "#fee500",
  "color": "#423630",
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
  title: "깃허브", url: "https://github.com/kkyubrother", color: "#000000", icon: "logo-github", status: "ok"
}, {
  title: "깃허브",
  url: "https://github.com/kkyubrother",
  color: "#000000",
  icon: "logo-github",
  status: "https://github.com/kkyubrother/lecture_with_note_web"
}]

const CustomAnchor = styled.a`
  --color: ${props => props?.color && props.color}
`
const getStatusColor = status => {
  switch (status) {
    case "ok":
      return "#32CD32";
    case "fail":
      return "#DC143C";
    default:
      if (/^https?:\/\/(www\.)?github\.com.+/.test(status)) return "#000000"; else return "#708c98";
  }
}
const getStatusIcon = status => {
  switch (status) {
    case "ok":
      return "checkbox-outline";
    case "fail":
      return "alert-circle-outline";
    default:
      if (/^https?:\/\/(www\.)?github\.com.+/.test(status)) return "logo-github"; else return "help-circle-outline";
  }
}

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
  return (<div className="main">
      <div className="profile">
        <div className="imgBx" onClick={handleOnClickUser}>
          <img src="./img/my.jpg" alt="user"/>
        </div>
        <div className="myExplain">
          <p>안녕하세요.</p>
          <p>프로그래밍 공부가 즐거움인 개발자 김규형입니다.</p>
          <p>꼼꼼한 성격과 공부를 즐거워하는 것이 저의 장점입니다.</p>
        </div>
      </div>
      <ul className="menu">
        {my.map(value => {
          if (value.type === "divider") return <li className="divider" key={"divider"}></li>

          const span_status_style = {color: getStatusColor(value?.status)};
          const icon_name = getStatusIcon(value?.status)
          const handleOnClick = (e) => {
            if (/^https?:\/\/(www\.)?github\.com.+/.test(value?.status)) {
              e.preventDefault()
              e.stopPropagation()

              const anchor = document.createElement("a");
              anchor.rel = "noreferrer";
              anchor.referrerPolicy = "no-referrer";
              anchor.href = value?.status;
              anchor.target = "_parent";
              anchor.click();
            }
          }

          return (<li key={value.url}>
            <CustomAnchor href={value.url} color={value.color}>
              <span className="icon" style={{color: value.color}}>
                <ion-icon name={value.icon} size="large"></ion-icon>
              </span>
              <span className="text">{value.title}</span>
              <span className="icon status" style={span_status_style} onClick={handleOnClick}>
                <ion-icon name={icon_name} size="large"></ion-icon>
              </span>
            </CustomAnchor>
          </li>)
        })}
      </ul>
    </div>)
}

export default MainPage;