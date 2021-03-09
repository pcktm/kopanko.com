<template>
  <div class="contact">
    <h3>Contact me</h3>
    <ul>
      <li>
        <a 
          href="#" 
          class="mail"
          data-account="hi"
          data-domain="kopanko"
          onclick="window.location.href = 'mailto:' + this.dataset.account + '@' + this.dataset.domain + '.com'; return false;"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.contact {
  padding: 0 12px;
  padding-bottom: 10px;

  h3 {
  color: #fff;
  margin-top: 30px;
  margin-bottom: 0;
  font-weight: 400;
  }

  ul {
    list-style-type: none;
    padding: 0;
    font-size: 16px;
    color: hsl(200, 7%, 53%);
  }

  li {
    margin-top: 8px;
  }


  .mail {
    padding-top: 8px;
    text-decoration: none;
  }

  .mail:after {
    content: attr(data-account) "@" attr(data-domain) ".com"; 
  }
}

</style>