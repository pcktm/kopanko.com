<template>
  <ul class="secondary">
      <h3 v-on:click="visible = !visible">
        <span v-if="!visible">▸</span>
        <span v-else>▾</span>
        <span id="secondary-header">Past projects</span>
      </h3>
      <div v-if="visible">
        <li>
          <div class="list-wrapper"> 
            <div class="date">2018 - 2019</div>
            <div class="title">
              🤝
              <a class="link-title">
              youthworks.pl
              </a>
            </div>
          </div>

          youthworks.pl was to help young people find a job and experience so sought after by the employer.
        </li>

        <li>
          <div class="list-wrapper"> 
            <div class="date">2017 - 2019</div>
            <div class="title">
              🎨
              <a class="link-title">
                SAMPL
              </a>
            </div>
          </div>

          SAMPL (Scene of the Artists of the Young Generation of Lublin) aimed to show the works of young people from Lublin to a wider audience.<br>
        </li>
      </div>
    </ul>
</template>

<script>
export default {
    props: ['visible']
}
</script>