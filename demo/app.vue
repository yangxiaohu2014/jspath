<template>
  <div>
    <ul class="nav">
      <router-link v-for='link in links' :to='"/" + link.to' :key='link.name' tag="li">
        {{link.name}}
      </router-link>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import {names} from './router/config'

export default {
  name: 'app',
  data() {
    return {
      links: names
    }
  }

}
</script>

<style lang='less'>
body {
  background: #03A9F4;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.clear-both {
  &:after {
    content: '';
    height: 0;
    width: 0;
    display: block;
    clear: both;
  }
}
.float-left {
  float: left;
}

.nav {
  text-align: left;
  margin-bottom: 10px;
}
.nav li {
  display: inline-block;
  background: #607d8b;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;
}

.info {
    height: 482px;
    width: 520px;
    vertical-align: top;
    word-break: break-all;
    padding: 0 20px;

    li {
        margin-bottom: 16px;

        div {
          text-align: left;
          background: #fff;
          padding: 10px;
          margin-top: 12px;
        }

        &:last-of-type div {
            height: 180px;
            overflow: auto;
        }
    }
}

.code {
    text-align: left;
    max-height: 480px;
    overflow-y: auto;

    pre {
      margin: 0;
    }

    code {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #444;
      color: #fff;
    }
}
</style>
