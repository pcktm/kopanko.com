<template>
  <ul class="achievements">
    <h3 v-on:click="visible = !visible">
      <span v-if="!visible">▸</span>
      <span v-else>▾</span>
      <span id="secondary-header">Achievements</span>
    </h3>
    <div v-if="visible">
      <li>
        <div class="list-wrapper"> 
          <div class="date">2021</div>
          <div class="title">
            ⌨️ 
            <a href="https://cloud.kopanko.com/index.php/s/t7karHgpWLqdinA" target="_blank" class="link-title">
              BITEhack2021 - 2nd Place Winner
            </a>
          </div>
        </div>

        I lead a team of student developers and in under 24 hours we developed a fully working shorcut manager and executor for a smarter workplace and people with increased needs.
      </li>

      <li>
        <div class="list-wrapper"> 
          <div class="date">2020</div>
          <div class="title">
            🐗
            <a href="https://hackyeah.pl/2020/12/10/the-finalist-boar-inc/" target="_blank" class="link-title">
              HackYeah - Finalist in partner task
            </a>
          </div>
        </div>

        My friend and I developed a sophisticated solution to track wild boar sightings along with advanced spatial analysis tools.
      </li>

      <li>
        <div class="list-wrapper"> 
          <div class="date">2020</div>
          <div class="title">
            🎮
            <a href="https://pcktm.itch.io/brawlbox" target="_blank" class="link-title">
              Grarantanna Game Jam - 1st Place Winner
            </a>
          </div>
        </div>

        Me and my friend took first place for the best gameplay with game BRAWLBOX, written from scratch in a few days.
      </li>

      <li>
        <div class="list-wrapper"> 
          <div class="date">2019</div>
          <div class="title">
            🎭
            <a href="https://cloud.kopanko.com/index.php/s/eDJEw5fiixKHGcE" target="_blank" class="link-title">
              XVI Lubelskie Spotkania Teatralne Zwierciadła
            </a>
          </div>
        </div>

        I was the main coordinator of the XVI Lublin Theatre Meetings „Zwierciadła” - the biggest and most recognizable youth theatre festival in Poland. That year's edition was a great success.
      </li>

      <li>
        <div class="list-wrapper"> 
          <div class="date">2018</div>
          <div class="title">
            👨‍💻
            <a class="link-title">
              HackYeah - The biggest stationary hackathon in Europe
            </a>
          </div>
        </div>

        I was a finalist in the Education category with a project of an innovative simulator of physical experiments for classrooms - Joint, while being one of the youngest participants.
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  props: ['visible']
}
</script>