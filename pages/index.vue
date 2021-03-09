<template>
  <div>
    <div class="hero">
      <div>
        <h1>Jakub Kopańko</h1>
        <h2></h2>
        <p>Full-stack developer,<br>
        film director and editor.</p>
      </div>
    </div>

    <div class="container">
      <projects />
      <films />
      
      <achievements :visible="achievementsVisible" />
      <pastProjects :visible="pastVisible" />
    </div>

    

    <contact />
  </div>
</template>

<script>
import contact from '~/components/Contact'
import films from '~/components/Films.vue'
import projects from '~/components/Projects'
import achievements from '~/components/Achievements'
import pastProjects from '~/components/PastProjects'
export default {
  components: { contact, projects, films, achievements, pastProjects },
  data() {
    return {
      pastVisible: false,
      achievementsVisible: false,
    }
  }
}
</script>