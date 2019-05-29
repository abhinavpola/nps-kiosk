<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">{{title}}</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Github</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Filter #1 <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Filter #2
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Filter #3
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Filter #4
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Filter #5
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Filter #6
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Results</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Filter</button>
                <button class="btn btn-sm btn-outline-secondary">Filter</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                Sort
              </button>
            </div>
          </div>
          <div id="accordion">
            <div v-for="park in info" class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" v-bind:data-target="'#'+park['parkCode']" aria-expanded="false">
                      {{park["fullName"]}}
                    </button>
                  </h5>
                </div>

                <div v-bind:id="park['parkCode']" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    {{park["description"]}}
                  </div>
                </div>
              </div>
          </div>
        </main>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      title: 'National Park Services',
      info: null
    }
  },
  mounted() {
    axios
      .get('https://developer.nps.gov/api/v1/parks?limit=5&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b')
      .then(response => {
        this.info = response["data"]["data"]
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
