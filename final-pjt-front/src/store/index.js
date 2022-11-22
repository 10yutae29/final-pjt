import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'


Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movies: [],
    movies_filtered : [],
    genres: null,
    token: null,
    logedin_user: null,
    user_info: null,
    movie_comments: null,
    selected_genres: [],
    user_detail: null,
    random_movies: null,
    genres_length: null,
    recommend_movies: null
  },
  getters: {
    isLogin(state) {
      return state.token ? true: false
    },
  },
  mutations: {
    TEST(state) {
      state.recommend_movies = [
        {
            "id": 129,
            "title": "센과 치히로의 행방불명",
            "release_date": "2001-07-20T00:00:00Z",
            "overview": "평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을 잘못 들어 낡은 터널을 지나가게 된다. 터널 저편엔 폐허가 된 놀이공원이 있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나 없는 이 마을의 낯선 분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만 부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에 도착한 치히로의 부모님은 그 곳에 차려진 음식들을 보고 즐거워하며 허겁지겁 먹어대다가 돼지로 변해버린다. 겁에 질려 당황하는 치히로에게 낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데...",
            "vote_average": 8.5,
            "popularity": 103,
            "poster_path": "/u1L4qxIu5sC2P082uMHYt7Ifvnj.jpg",
            "genres": [
                14,
                16,
                10751
            ],
            "like_users": [
                1
            ]
        },
        {
            "id": 155,
            "title": "다크 나이트",
            "release_date": "2008-07-14T00:00:00Z",
            "overview": "범죄와 부정부패를 제거하여 고담시를 지키려는 배트맨. 그는 짐 고든 형사와 패기 넘치는 고담시 지방 검사 하비 덴트와 함께 도시를 범죄 조직으로부터 영원히 구원하고자 한다. 세 명의 의기투합으로 위기에 처한 악당들이 모인 자리에 보라색 양복을 입고 얼굴에 짙게 화장을 한 괴이한 존재가 나타나 배트맨을 죽이자는 사상 초유의 제안을 한다. 그는 바로 어떠한 룰도, 목적도 없는 사상 최악의 악당 미치광이 살인광대 조커. 배트맨을 죽이고 고담시를 끝장내버리기 위한 조커의 광기 어린 행각에 도시는 혼란에 빠지는데...",
            "vote_average": 8.5,
            "popularity": 91,
            "poster_path": "/f6dNinWX8rBM79JXKcShkfSh2oA.jpg",
            "genres": [
                18,
                28,
                53,
                80
            ],
            "like_users": [
                1
            ]
        },
        {
            "id": 238,
            "title": "대부",
            "release_date": "1972-03-14T00:00:00Z",
            "overview": "시실리에서 이민온 뒤, 정치권까지 영향력을 미치는 거물로 자리잡은 돈 꼴레오네는 갖가지 고민을 호소하는 사람들의 문제를 해결해주며 대부라 불리운다. 한편 솔로소라는 인물은 꼴레오네가와 라이벌인 탓타리아 패밀리와 손잡고 새로운 마약 사업을 제안한다. 돈 꼴레오네가 마약 사업에 참여하지 않기로 하자, 돈 꼴레오네를 저격해 그는 중상을 입고 사경을 헤매게 된다. 그 뒤, 돈 꼴레오네의 아들 소니는 조직력을 총 동원해 다른 패밀리들과 피를 부르는 전쟁을 시작하는데... 가족의 사업과 상관없이 대학에 진학한 뒤 인텔리로 지내왔던 막내 아들 마이클은 아버지가 총격을 당한 뒤, 아버지를 구하기 위해 위험천만한 협상 자리에 나선다.",
            "vote_average": 8.7,
            "popularity": 93,
            "poster_path": "/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg",
            "genres": [
                18,
                80
            ],
            "like_users": []
        },
        {
            "id": 240,
            "title": "대부 2",
            "release_date": "1974-12-20T00:00:00Z",
            "overview": "아버지의 장례식 도중에 맏아들 파올로가 총에 맞아 죽고, 비토(로버트 드니로)는 겨우 도망쳐 미국으로 건너온다. 대부로 성장한 후 비토는 다시 치치오를 찾아 복수를 한다. 새롭게 등장한 젊은 대부 마이클(알 파치노)은 본거지를 라스베가스로 옮기고 가족의 사업을 가능한 합법적인 것으로 바꾸려고 애쓴다. 그런 과중 중에 자신을 제거하려는 음모를 알게되고 그는 냉혹하고 신속하게 반대파들을 제거, 조직을 더욱 확대해 나간다. 이를 위해 마이클은 배신한 형마저 죽이고, 일 때문에 아내와 헤어지는 등 인간적으로는 계속 외로워져 가는데...",
            "vote_average": 8.6,
            "popularity": 63,
            "poster_path": "/cj9UsJEN5bNf6ZoF1BbKjKN81hc.jpg",
            "genres": [
                18,
                80
            ],
            "like_users": []
        },
        {
            "id": 278,
            "title": "쇼생크 탈출",
            "release_date": "1994-09-23T00:00:00Z",
            "overview": "촉망받는 은행 간부 앤디 듀프레인은 아내와 그녀의 정부를 살해했다는 누명을 쓴다. 주변의 증언과 살해 현장의 그럴듯한 증거들로 그는 종신형을 선고받고 악질범들만 수용한다는 지옥같은 교도소 쇼생크로 향한다. 인간 말종 쓰레기들만 모인 그곳에서 그는 이루 말할 수 없는 억압과 짐승보다 못한 취급을 당한다. 그러던 어느 날, 간수의 세금을 면제받게 해 준 덕분에 그는 일약 교도소의 비공식 회계사로 일하게 된다. 그 와중에 교도소 소장은 죄수들을 이리저리 부리면서 검은 돈을 긁어 모으고 앤디는 이 돈을 세탁하여 불려주면서 그의 돈을 관리하는데...",
            "vote_average": 8.7,
            "popularity": 85,
            "poster_path": "/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg",
            "genres": [
                18,
                80
            ],
            "like_users": []
        },
        {
            "id": 389,
            "title": "12명의 성난 사람들",
            "release_date": "1957-04-10T00:00:00Z",
            "overview": "뉴욕시의 법정에 아버지를 칼로 찌른 한 소년의 살인혐의를 두고, 12인의 배심원들은 만장일치 합의를 통해 소년의 유무죄 여부를 가려줄 것을 요구받는다. 판사는 유죄일 경우 이 소년은 사형이 불가피하다는 것을 이들에게 미리 일러둔다.  배심원 방에 모인 이들은 투표를 통해 유무죄 여부를 가리기로 한다. 사람들이 전부 소년이 유죄로 판단하는 가운데, 오직 한 배심원만이 소년이 무죄라고 주장하는데...",
            "vote_average": 8.5,
            "popularity": 36,
            "poster_path": "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
            "genres": [
                18
            ],
            "like_users": [
                1
            ]
        },
        {
            "id": 424,
            "title": "쉰들러 리스트",
            "release_date": "1993-12-15T00:00:00Z",
            "overview": "2차 세계대전 당시 독일군이 점령한 폴란드. 시류에 맞춰 자신의 성공을 추구하는 기회주의자 쉰들러는 유태인이 경영하는 그릇 공장을 인수한다. 그는 공장을 인수하기 위해 나찌 당원이 되고 독일군에게 뇌물을 바치는 등 갖은 방법을 동원한다. 그러나 냉혹한 기회주의자였던 쉰들러는 유태인 회계사인 스턴과 친분을 맺으면서 냉혹한 유태인 학살에 대한 양심의 소리를 듣기 시작한다. 마침내 그는 강제 수용소로 끌려가 죽음을 맞게될 유태인들을 구해내기로 결심하고, 독일군 장교에게 빼내는 사람 숫자대로 뇌물을 주는 방법으로 유태인들을 구해내려는 계획을 세우는데...",
            "vote_average": 8.6,
            "popularity": 54,
            "poster_path": "/oyyUcGwLX7LTFS1pQbLrQpyzIyt.jpg",
            "genres": [
                18,
                36,
                10752
            ],
            "like_users": [
                1
            ]
        },
        {
            "id": 429,
            "title": "석양의 무법자",
            "release_date": "1966-12-23T00:00:00Z",
            "overview": "미국의 남북전쟁이 한창인 때, 블론디는 멕시코인 총잡이 투코와 함께 동업 중이다. 블론디는 현상범 투코를 잡아 현상금을 받고, 투코가 교수형을 당하는 순간 구해주는 역할. 한편 세텐자라 불리우는 범죄자는 엄청나 돈이 묻힌 비밀장소를 추적 중이다. 그런데, 투코와 실랑이를 벌이던 블론디는 돈이 묻힌 장소를 죽어가는 사람에게 듣게 되고, 결국 둘은 돈을 찾아 나서는데...",
            "vote_average": 8.5,
            "popularity": 47,
            "poster_path": "/sOTQkPoEZd7ImsZBuXfu4BqZ6JS.jpg",
            "genres": [
                37
            ],
            "like_users": []
        },
        {
            "id": 497,
            "title": "그린 마일",
            "release_date": "1999-12-10T00:00:00Z",
            "overview": "미국 루이지애나의 콜드 마운틴 교도소. 폴은 사형수 감방의 간수장으로 일하고 있다. 그의 일은 사형수들을 감독하고, 그린 마일이라 불리는 초록색 복도를 거쳐 그들을 사형 집행장까지 안내하는 것. 폴은 그들이 죽음을 맞이하는 순간까지 평화롭게 지낼 수 있도록 최선을 다한다. 어느 날 존 커피라는 사형수가 이송되어 온다. 그는 쌍둥이 여자아이를 살해한 흉악범. 하지만 순진한 눈망울에 겁을 잔뜩 집어먹은 그의 모습에 폴은 당혹감을 느낀다. 게다가 그는 초자연적 능력으로 폴의 지병을 깨끗하게 치료해주기까지 한다. 존을 전기 의자로 데려가야 할 날이 다가오면서 폴은 그가 무죄라는 확신을 갖게 되는데...",
            "vote_average": 8.5,
            "popularity": 91,
            "poster_path": "/yuSpRhrTIJa5JN8oESrfD2bndp1.jpg",
            "genres": [
                14,
                18,
                80
            ],
            "like_users": []
        },
        {
            "id": 680,
            "title": "펄프 픽션",
            "release_date": "1994-09-10T00:00:00Z",
            "overview": "펌프킨와 허니 버니가 레스토랑에서 강도 행각을 벌이기 시작한다. 빈센트와 그 동료 쥴스는 두목의 금가방을 찾기 위해 다른 건달이 사는 아파트를 찾아간다. 마르셀러스는 부치에게 돈을 주며 상대 선수에게 져 주라고 하지만 부치는 상대 선수를 때려 눕히고 도망치다, 어릴 때 아버지에게 물려받은 시계를 찾기 위해 아파트로 향한다. 아무런 상관 없이 보이는 이 사건들이 서로 얽히고 섥히면서 예상치 못한 인과관계가 만들어지는데...",
            "vote_average": 8.5,
            "popularity": 76,
            "poster_path": "/6lXRHGoEbnnBUKsuqpL9JxD4DzT.jpg",
            "genres": [
                53,
                80
            ],
            "like_users": []
        },
        {
            "id": 19404,
            "title": "용감한 자가 신부를 데려가리",
            "release_date": "1995-10-19T00:00:00Z",
            "overview": "영국에서 유학중인 라즈(샤룩 칸)와 인도 처녀 심란(까졸).  심란은 부모님이 정해주신 약혼자가 있는데 약혼을 앞두고 친구들과 유럽 여행을 떠나게 된다.  여행 중 우연히 만남 샤룩과 까졸. 두 남녀의 연속된 우연과 좌충우돌 사랑 만들기.  그렇게 사랑하게 된 그들이지만 까졸은 약혼자가 있는 몸. 인도로 돌아가게 된다.  샤룩 또한 그녀를 못 잊어 인도로 뒤 따라 들어가지만 엄격한 까졸의 부모를 설득하기가 힘이 든다. 도망가자는 까졸의 제안을 거부하고 샤룩은 끝내 그녀의 부모님의 허락을 얻어 내기 위해 고군분투한다.",
            "vote_average": 8.6,
            "popularity": 25,
            "poster_path": "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
            "genres": [
                18,
                35,
                10749
            ],
            "like_users": []
        },
        {
            "id": 372058,
            "title": "너의 이름은",
            "release_date": "2016-08-26T00:00:00Z",
            "overview": "시골에 사는 소녀 미츠하(가미시라이시 모네)는 어느 날 잠에서 깬 후 자신의 몸이 남자로 바뀐 걸 알게 된다. 같은 시간, 도쿄에 사는 소년 타키(가미키 류노스케) 역시 이 기이한 상황을 겪고 있다. 낯선 가족, 낯선 친구들, 낯선 풍경들... 서로에게 이어진 끈을 알게 된 둘은 둘만의 규칙을 정하고 점차 상황을 받아들이기 시작한다. 서로에게 남긴 메모를 확인하며  점점 친구가 되어가는 타키와 미츠하. 언제부턴가 더 이상 몸이 바뀌지 않자  자신들이 특별하게 이어져있었음을 깨달은  타키는 미츠하를 만나러 가는데...",
            "vote_average": 8.5,
            "popularity": 142,
            "poster_path": "/wx1Dxr4UyvN18SyC5GsVWWWtYja.jpg",
            "genres": [
                16,
                18,
                10749
            ],
            "like_users": []
        },
        {
            "id": 372754,
            "title": "동급생",
            "release_date": "2016-02-20T00:00:00Z",
            "overview": "밴드 활동을 하며 여자에게도 인기가 많은 쿠사카베 히카루.  고교 입시에서 만점을 받은 인재 사죠 리히토. 도무지 접점이 없어 보이는 두 남학생은 합창 대회 연습을 계기로 친해진다. 음을 느끼고 목소리에 귀를 기울이고 화음을 만들어가며 둘의 마음은 공명하기 시작하는데… 느긋하게 고조되다 뜻밖의 순간에 터져버리는 사랑의 감정. 순수하고 솔직한 쿠사카베 히카루와 그를 밀어내면서도 조금씩 마음을 열어가는 사죠 리히토.  청춘의 풋풋함 속에서 고민하고, 망설이며 앞으로 나아가고자 하는 그들이 깨달은 마음이란…",
            "vote_average": 8.5,
            "popularity": 14,
            "poster_path": "/jNJ9shLhjRavjrCGRnoTmYB18d2.jpg",
            "genres": [
                16,
                10749
            ],
            "like_users": []
        },
        {
            "id": 496243,
            "title": "기생충",
            "release_date": "2019-05-30T00:00:00Z",
            "overview": "전원 백수로 살 길 막막하지만 사이는 좋은 기택 가족. 장남 기우에게 명문대생 친구가 연결시켜 준 고액 과외 자리는 모처럼 싹튼 고정수입의 희망이다. 온 가족의 도움과 기대 속에 박 사장 집으로 향하는 기우. 글로벌 IT기업의 CEO인 박 사장의 저택에 도착하자 젊고 아름다운 사모님 연교와 가정부 문광이 기우를 맞이한다. 큰 문제 없이 박 사장의 딸 다혜의 과외를 시작한 기우. 그러나 이렇게 시작된 두 가족의 만남 뒤로, 걷잡을 수 없는 사건이 기다리고  있는데.....",
            "vote_average": 8.5,
            "popularity": 80,
            "poster_path": "/jjHccoFjbqlfr4VGLVLT7yek0Xn.jpg",
            "genres": [
                18,
                35,
                53
            ],
            "like_users": []
        },
        {
            "id": 553512,
            "title": "번 더 스테이지: 더 무비",
            "release_date": "2018-11-15T00:00:00Z",
            "overview": "19개 도시, 40회의 공연, 55만석 날개를 펼친 소년들의 역사. 성공적인 월드 투어로 마무리된 ‘2017 방탄소년단 라이브 트릴로지 에피소드3 윙스 투어(2017 BTS LIVE TRILOGY EPOSODE III THE WINGS TOUR)’를 가장 가까이에서 담아낸 방탄소년단의 첫 번째 영화! 지금, 우리  함께 빛나는 청춘의 순간이 스크린에 펼쳐진다.",
            "vote_average": 8.5,
            "popularity": 21,
            "poster_path": "/pJKy1yvnKh8UjcuYeG3Rt35xHFA.jpg",
            "genres": [
                10402
            ],
            "like_users": []
        },
        {
            "id": 620249,
            "title": "나소흑전기: 첫만남편",
            "release_date": "2019-08-27T00:00:00Z",
            "overview": "숲속의 집을 잃고 홀로 떠돌던 검은 고양이 요정 ‘소흑’은 도시 뒷골목에서 미스터리한 능력의 요정 ‘풍식’을 만나 위기를 모면한다. ‘풍식’의 무리와 버려진 섬에서 행복한 시간을 보내는 ‘소흑’. 그러던 중 최강 능력의 집행자 ‘무한’이 ‘풍식’을 쫓아 섬에 오자 ‘풍식’ 일행은 달아나고, ‘소흑’만 남게 된다.  홀로 남은 ‘소흑’을 요정들의 회관으로 데려가려는 ‘무한’과 ‘무한’을 무서운 인간이라 여겨 도망치려는 ‘소흑’. 둘은 여정 속에서 점점 마음을 열게 되고, ‘무한’은 ‘소흑’에게 특별한 능력이 있음을 알게 된다.",
            "vote_average": 8.6,
            "popularity": 11,
            "poster_path": "/nDieZR47cirx44UZxKQsCbRGYqW.jpg",
            "genres": [
                14,
                16,
                28
            ],
            "like_users": []
        },
        {
            "id": 667257,
            "title": "불가능한 것들",
            "release_date": "2021-06-17T00:00:00Z",
            "overview": "폭력적인 남편의 사망 후, 마틸데는 여전히 트라우마와 외로움 그리고 유령같이 그녀의 주변을 맴도는 남편의 흔적에 시달린다. 이웃집 소년 미겔과 가까워진 마틸데는 미겔의 마약 판매에 가담하면서, 이전까지 경험하지 못했던 새로운 삶에 눈을 뜨기 시작한다. 나이 차에도 불구하고 두 사람이 나누는 평범하지 않은 우정은 서로의 상처를 보듬고 치유해 준다. 삶의 막다른 골목에서, 불가능해 보였던 희망을 향해 나아가는 마틸데와 미겔의 용기 어린 선택이 감동으로 다가온다.",
            "vote_average": 8.5,
            "popularity": 12,
            "poster_path": "/eaf7GQj0ieOwm08rrvjJQNbN0kN.jpg",
            "genres": [
                18,
                10751
            ],
            "like_users": []
        },
        {
            "id": 696374,
            "title": "가브리엘의 지옥",
            "release_date": "2020-05-29T00:00:00Z",
            "overview": "",
            "vote_average": 8.5,
            "popularity": 12,
            "poster_path": "/oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg",
            "genres": [
                10749
            ],
            "like_users": []
        },
        {
            "id": 724089,
            "title": "가브리엘의 지옥 파트 2",
            "release_date": "2020-07-31T00:00:00Z",
            "overview": "",
            "vote_average": 8.5,
            "popularity": 13,
            "poster_path": "/8Rxutea68d940kg44Box5gFmKcF.jpg",
            "genres": [
                10749
            ],
            "like_users": []
        },
        {
            "id": 851644,
            "title": "20세기 소녀",
            "release_date": "2022-10-06T00:00:00Z",
            "overview": "보라의 둘도 없는 친구 연두는 심장 수술을 위해 미국에 가면서 자신이 좋아하는 남자 백현진에 대한 모든 정보를 수집해 달라고 보라에게 부탁한다. 보라는 백현진의 가장 친한 친구 풍운호와 먼저 친해지기로 한다. 하지만 보라의 서투른 계획은 예상치 못한 방향으로 전개된다. 새로운 세기가 오기 1년 전인 1999년, 17세가 된 보라는 첫사랑의 열병에 빠진다.",
            "vote_average": 8.7,
            "popularity": 447,
            "poster_path": "/xM9Jt2sA6QcvLuHKM0RI3BMtFc5.jpg",
            "genres": [
                18,
                10749
            ],
            "like_users": []
        }
    ]
    },
    GET_MOVIES(state, movies) {
      state.movies = movies
      state.movies_filtered = state.movies
    },
    GET_GENRES(state, genres) {
      state.genres = genres
    },
    SEARCH_FILTER(state, word) {
      state.movies_filtered = state.movies.filter(movie => movie.title.toLowerCase().includes(word))
    },
    SCORE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return b.vote_average - a.vote_average
      })
    },
    SCORE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return a.vote_average - b.vote_average
      })
    },
    TITLE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        if (a.title > b.title) return 1;
    else if (b.title > a.title) return -1;
    else return 0;
      })
    },
    TITLE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        if (a.title > b.title) return -1;
    else if (b.title > a.title) return 1;
    else return 0;
      })
    },
    DATE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
    },
    DATE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push('/moviesview')
    },
    GET_LOGIN_USER(state, logedin_user) {
      state.logedin_user = logedin_user
      state.user_info = logedin_user
    },
    LOG_OUT(state) {
      // console.log('여기')
      
      state.logedin_user = null
      state.token = null
    
      localStorage.removeItem('logedin_user')
      localStorage.removeItem('token')
      // console.log('사이')
      // localStorage.removeItem('vuex')
      // console.log(localStorage.vuex)
      router.push('/')

      // if(this.$route.path !=='/moviesview') router.push('/moviesview')
      // console.log(this.$route.path)

    },
    GET_MOVIE_COMMENTS(state, comments) {
      state.movie_comments = comments
    },
    GET_SELECTED_GENRES(state, selected_genres){
      state.selected_genres = selected_genres.prefer_genres
      state.genres_length = selected_genres.prefer_genres.length
      if (state.genres_length == 0) {
        const movies = state.movies
        const random_movies = _.sampleSize(movies, 15)
        state.random_movies = random_movies
        console.log(state.random_movies)
      }

    },
    GET_USER_INFO(state, user_detail) {
      state.user_detail = user_detail
    },
    GET_RANDOM_MOVIES(state) {
      const movies = state.movies
        const random_movies = _.sampleSize(movies, 15)
        state.random_movies = random_movies
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`
      })
      .then(response => {
        context.commit('GET_MOVIES', response.data) 
      })
      .catch(error => {
        console.log(error)
      })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/save-genre/`
      })
      .then(response => {
        context.commit('GET_GENRES', response.data) 
      })
      .catch(error => {
        console.log(error)
      })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2
        }
      })
      .then((response) => {
        context.commit('SAVE_TOKEN', response.data.key)
        axios({
          method: 'get',
          url: `${API_URL}/accounts/user/`,
          headers: {
            Authorization: `Token ${response.data.key}`
          },
        })
        .then((response) => {
          context.commit('GET_LOGIN_USER', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
      .then((response) => {
        context.commit('SAVE_TOKEN', response.data.key)
        console.log(response)
        axios({
          method: 'get',
          url: `${API_URL}/accounts/user/`,
          headers: {
            Authorization: `Token ${response.data.key}`
          },
        })
        .then((response) => {
          context.commit('GET_LOGIN_USER', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
        window.alert('아이디와 비밀번호를 확인해주세요.')
      })

    },
    changePassword(context, payload) {
      axios({
        method: 'post',
        url:  `${API_URL}/accounts/password/change/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          new_password1: payload.new_password1,
          new_password2: payload.new_password2,
        }
      })
      .then(() => {
        router.push('/moviesview')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getLoginUser(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        context.commit('GET_LOGIN_USER', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // logOut(context) {     
    //   context.commit('LOG_OUT')
    // },
    getMovieComments(context, movie_id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${movie_id}/`,
      })
      .then((response) => {
        const comments = response.data.comment_set
        context.commit('GET_MOVIE_COMMENTS', comments)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteComment(context, commentItem) {
      axios({
        method: 'delete',
        url: `${API_URL}/community/comment/${commentItem[0]}/`,
      })
      .then((response) => {
        this.dispatch('getMovieComments',commentItem[1],response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createComment(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/community/comment/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          content: payload.content,
          user: payload.user,
          movie: payload.movie,
        },
      })
      .then((response) => {
        console.log(response)
        this.dispatch('getMovieComments',payload.movie)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getUserInfo(context, user_pk){
      axios({
        method: 'get',
        url: `${API_URL}/accounts_detail/${user_pk}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response.data)
        context.commit('GET_USER_INFO', response.data)
      })
      .catch((error) => {
        console.log(error)
        console.log('에러남 ㄷ')
      })
    },
    getRandomMovies(context){
      context.commit('GET_RANDOM_MOVIES')
    },
    getSelectedGenres(context){
      axios({
        method: 'get',
        // django에서 이 url로 현재 로그인한 사람이 선택한 장르 리스트를 올려줌
        url: `${API_URL}/accounts_detail/recommend/${this.state.logedin_user.pk}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response.data)
        context.commit('GET_SELECTED_GENRES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goGenres(context, picked_movies) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts_detail/recommend/${this.state.logedin_user.pk}/`,
        data: {
          picked_movies: picked_movies
        },
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log('데이터')
        console.log(response.data)
        // axios({
        //   method: 'get',
        //   // django에서 이 url로 현재 로그인한 사람이 선택한 장르 리스트를 올려줌
        //   url: `${API_URL}/accounts_detail/recommend/${this.state.logedin_user.pk}/`,
        //   headers: {
        //     Authorization: `Token ${context.state.token}`
        //   },
        // })
        // .then((response) => {
        //   console.log(response.data)
        //   context.commit('GET_SELECTED_GENRES', response.data)
        // })
        // .catch((error) => {
        //   console.log(error)
        // })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})





// axios({
//   method: 'get',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`
//   },
// })
// // 좋아요한 영화가 하나도 없을 때
// // 위처럼 요청을 보내면 아래처럼 응답이 와야함
// response.data.my-prefer-genres = []

// axios({
//   method: 'post',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`,
//   data: {
//     Picked_Genres : ['공포', '코미디', 'SF', '가족', '코미디', '액션'],
//     plus: true
//   }
//   },
// })
// // 첫 Recommend 페이지에서 영화 3개를 고르고 Picked_Genres로 담아 위와같이 보내면
// // django에서는 Picked_Genres를 for을 돌며 
// // prefer-genres의 logedin_user.pk row의 장르에 카운트 +를 해준다


// axios({
//   method: 'get',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`
//   },
// })
// // 좋아요한 영화가 있거나 첫 Recommend페이지에서 선택한 영화가 db에서 다 count 된상태에서 위와같이 요청을 보내면
// // 아래와 같은 응답이 와야함
// response.data.my-prefer-genres = ['코미디', '공포', '가족']