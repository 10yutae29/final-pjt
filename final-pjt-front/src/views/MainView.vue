<template>
  <div class="mainview-grid">
    <div class="mainview-title">
      <h1>SEE원한 영화에 오신것을 환영합니다.</h1>
    </div>
    
    <div class="water-box">
      <div class="drop" style="--clr:#673ab7">
        <div class="water-content">
          <h2>01</h2>
          <p>모든 영화에 대한 정보를 확인할 수 있습니다. 검색 밑 필터 기능을 통해 원하는 영화 정보를 확인할 수 있습니다</p>
          <router-link to="/moviesview">GO</router-link>
        </div>
      </div>
      <div class="drop" style="--clr:#3f51b5">
        <div class="water-content">
          <h2>02</h2>
          <p>사용자가 좋아요를 누른 영화를 기반으로 영화를 추천해줍니다. 로그인이 필요한 서비스입니다.</p>
          <router-link to="/recommendview">GO</router-link>
        </div>
      </div>
      <div class="drop" style="--clr:#2196f3">
        <div class="water-content">
          <h2>03</h2>
          <p>프로젝트에 대한 자세한 내용을 확인하시려면 저희의 GitHub에 방문해주세요.</p><br>
          <a href="https://github.com/10yutae29/final-pjt">GO</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainView'
}
</script>

<style>
.mainview-grid{
  margin: 10vh 10vh 10vh 10vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template: 20% auto;
  padding: 5vw;
  /* background: radial-gradient(white , rgb(13, 97, 207)); */
  background: white;
  border-radius: 5px;
}

.mainview-title{
  display: flex;
  justify-content: center;
}

.mainview-title h1{
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 4vw;
}

.mainview-content{
  padding-top: 5vh;
  display: flex;
  justify-content: center;
}

.mainview-content p{
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 2vw;

}


/* 여기서부터 물방울 */
.water-box{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px 0;
  gap: 40px 60px
}
.water-box .drop{
  position: relative;
  width: 450px;
  height: 450px;
  background: rgb(237, 237, 237);
  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
  25px 35px 20px rgba(0, 0, 0, 0.05),
  25px 30px 30px rgba(0, 0, 0, 0.05),
  inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  transition: 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}
.water-box .drop:nth-child(1){
  border-radius: 50% 50% 58% 42% / 34% 41% 59% 66%  ;
}
.water-box .drop:nth-child(2){
  border-radius: 37% 63% 49% 51% / 42% 20% 80% 58% ;
}

.water-box .drop:nth-child(3){
  border-radius: 50% 50% 40% 60% / 46% 33% 67% 54%   ;
}
.water-box .drop:hover{
  border-radius: 50%;
}
.water-box .drop:before{
  content:'';
  position: absolute;
  top: 50px;
  left: 85px;
  width: 35px;
  height: 35px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.9;
}

.water-box .drop:after{
  content:'';
  position: absolute;
  top: 90px;
  left: 110px;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.9;
}

.water-box .drop .water-content{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
  gap: 15px;
}

.water-box .drop .water-content h2{
  position: relative;
  width: 80px;
  height: 80px;
  background: #eff0f4;
  border-radius: 50%;
  box-shadow: inset 2px 5px 10px rgba(0,0,0,0.1),
  inset -2px -5px 10px rgba(255,255,255,1),
  15px 15px 10px rgba(0,0,0,0.05),
  15px 10px 15px rgba(0,0,0,0.025);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: var(--clr);
}
.water-box .drop .water-content a{
  width: 130px;
  height: 50px;
  position: relative;
  padding: 10px 25px;
  background: var(--clr);
  text-decoration: none;
  color: #fff;
  border-radius: 25px;
  font-weight: 500;
  text-shadow: 0, 2px, 2px rgba(0,0,0,0.25);
  opacity: 0.75;
  transition: 0.5s;
  font-size: 25px;
}

.water-content p{
  font-size: 2rem;
}

.water-box .drop .water-content a:hover{
  opacity: 1;
}
.water-box .drop .water-content a::before{
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 5px;
  border-radius: 5px;
  background: rgba(255,255,255,0.5);
}
</style>