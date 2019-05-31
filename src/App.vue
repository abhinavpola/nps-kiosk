<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">{{title}}</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
        v-model="searchQuery"
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="https://github.com/abhinavpola/nps-kiosk">Github</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <span class="nav-link">State</span>
                <div>
                <select class="form-control form-control-dark" name="state" id="state" v-model="stateFilter">
                  <option value="">Filter by state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                </div>
              </li>
              <li class="nav-item">
                <span class="nav-link">Designation</span>
                <input
                  class="form-control form-control-dark w-100"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  v-model="desgQuery"
                >
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">Results</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Filter</button>
                <button class="btn btn-sm btn-outline-secondary">Filter</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">Sort</button>
            </div>
          </div>
          <div class="d-flex justify-content-center" v-if="loading">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
          <div id="accordion">
            <div v-for="park in filteredResources" v-bind:key="park" class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    v-bind:data-target="'#'+park['parkCode']"
                    aria-expanded="false"
                    v-on:click="getInfo(park['parkCode'])"
                  >{{park["fullName"]}}</button>
                </h5>
              </div>

              <div
                v-bind:id="park['parkCode']"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  {{park["description"]}}
                  <hr>
                  <div class="row">
                    <div class="col-6">

                      <div v-for="vc in visitingCenters" v-bind:key="vc">
                        {{vc["name"]}}
                      </div>
                    </div>
                    <div class="col-6">
                      <div v-for="cp in campGrounds" v-bind:key="cp">
                        {{cp["name"]}}
                      </div>
                    </div>
                  </div>
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
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      parks: [],
      title: "National Park Services",
      searchQuery: "",
      stateFilter: "",
      desgQuery: "",
      filteredResources: [],
      loading: true,
      visitingCenters: [],
      campGrounds: [],
    };
  },
  methods: {
    getInfo: function(pCode) {
      axios
      .get(
        "https://developer.nps.gov/api/v1/visitorcenters?parkCode="+pCode+"&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
      )
      .then(response => {
        this.visitingCenters = response["data"]["data"];
        return axios.get("https://developer.nps.gov/api/v1/campgrounds?parkCode="+pCode+"&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b")
        .then(nextResponse => {
          this.campGrounds = nextResponse["data"]["data"];
        })
      })
    }
  },
  mounted() {
    axios
      .get(
        "https://developer.nps.gov/api/v1/parks?limit=15&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
      )
      .then(response => {
        this.parks = response["data"]["data"];
        this.filteredResources = this.parks;
        this.loading = false;
      })
  },
  watch: {
    searchQuery() {
      if (this.searchQuery === "") {
        this.filteredResources = this.parks;
      }
      this.filteredResources = this.filteredResources.filter(park =>
        park["fullName"].toUpperCase().includes(this.searchQuery.toUpperCase())
      );
    },
    stateFilter() {
      if (this.searchQuery === "") {
        this.filteredResources = this.parks;
      }
      this.filteredResources = this.filteredResources.filter(park => 
        park["states"] === (this.stateFilter)
      )
    },
    desgQuery() {
      if (this.searchQuery === "") {
        this.filteredResources = this.parks;
      }
      if (this.desgQuery === "") {
        this.filteredResources = this.parks;
      }
      this.filteredResources = this.filteredResources.filter(park =>
        park["designation"].toUpperCase().includes(this.desgQuery.toUpperCase())
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#state {
  color: #495057;
}
</style>
