<template>
  <div class="mainview-grid">
    <div class="mainview-title">
      <h1>SEE원한 영화에 오신것을 환영합니다.</h1>
    </div>
    <div class="mainview-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur omnis aperiam ipsum, laudantium ullam officia deleniti vel excepturi blanditiis sit et veniam ipsam facilis dolorum esse est quo placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. At officia ex tempora voluptatum facere placeat minima adipisci, voluptates necessitatibus perferendis architecto dolorem illo quibusdam a. Quos dignissimos magnam numquam nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eos ullam sint minima alias, est corrupti neque enim ducimus veritatis. Necessitatibus incidunt amet rem excepturi tempore ducimus asperiores, ipsa error!</p>
    </div>
    <div class="water-box">
      <div class="drop" style="--clr:#1B03DB">
        <div class="water-content">
          <h2>01</h2>
          <p>모든 영화에 대한 정보를 확인할 수 있습니다. 검색 밑 필터 기능을 통해 원하는 영화 정보를 확인할 수 있습니다</p>
          <router-link to="/moviesview">GO</router-link>
        </div>
      </div>
      <div class="drop" style="--clr:#9000FF">
        <div class="water-content">
          <h2>02</h2>
          <p>사용자가 좋아요를 누른 영화를 기반으로 영화를 추천해줍니다.</p>
          <p>로그인이 필요한 서비스입니다.</p>
          <router-link to="/recommendview">GO</router-link>
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
  margin: 5vh 5vh 5vh 5vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template: 20% auto auto;
  padding: 10vw;
  background: radial-gradient(white , rgb(255, 168, 168));
  border-radius: 5px;
}

.mainview-title{
  display: flex;
  justify-content: center;
}

.mainview-title h1{
  color: rgb(0, 0, 0);
  text-align: center;
}

.mainview-content{
  padding-top: 5vh;
  display: flex;
  justify-content: center;
}

.mainview-content p{
  color: rgb(0, 0, 0);
  text-align: center;
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
  width: 350px;
  height: 350px;
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
  border-radius: 44% 56% 70% 30% / 30% 41% 59% 70% ;
}
.water-box .drop:nth-child(2){
  border-radius: 37% 63% 49% 51% / 42% 20% 80% 58% ;
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