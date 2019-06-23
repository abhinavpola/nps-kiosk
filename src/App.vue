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
                  <select
                    class="form-control form-control-dark"
                    name="state"
                    id="state"
                    v-model="stateFilter"
                  >
                    <option value>Filter by state</option>
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
            <h2>Results</h2>
            
          </div>
          <div class="d-flex justify-content-center" v-if="loading">
            <div class="spinner-border" role="status"></div>
          </div>
          <div id="accordion">
            <div v-for="(park, pindex) in filteredResources" class="card" v-bind:key="'park'+pindex">
              <div class="card-header">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    v-bind:data-target="'#'+park['parkCode']"
                    aria-expanded="false"
                    v-on:click="getInfo(park['parkCode'], park['latLong'])"
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
                  <div class="d-flex justify-content-center" v-if="cardLoading">
                    <div class="spinner-border" role="status"></div>
                  </div>
                  <div class="row" v-if="!cardLoading">
                    <div class="col-sm-4" v-for="(article, idx) in articles" v-bind:key="idx">
                      <h4>Articles</h4>
                      <div class="card">
                        <img class="card-img-top d-block w-100" v-bind:src="article['listingimage']['url']">
                        <div class="card-body">
                          <h5 class="card-title">{{article["title"]}}</h5>
                          <p class="card-text">{{article["listingdescription"]}}</p>
                          <a v-bind:href="article['url']" class="btn btn-primary">Read more</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4" v-for="(newsItem, idx) in news" v-bind:key="'news'+idx">
                      <h4>News</h4>
                      <div class="card">
                      <img class="card-img-top d-block w-100" v-bind:src="newsItem['image']['url']">
                      <div class="card-body">
                        <h5 class="card-title">{{newsItem["title"]}}</h5>
                        <p class="card-text">{{newsItem["abstract"]}}</p>
                        <a v-bind:href="newsItem['url']" class="btn btn-primary">Read more</a>
                      </div>
                    </div>
                    </div>
                    <div class="col-sm-4" v-for="(event, idx) in events" v-bind:key="'event'+idx">
                      <h4>Events</h4>
                      <div class="card">
                        <img class="card-img-top d-block w-100" src="https://images.homedepot-static.com/productImages/0b10f2de-892e-42b7-aed4-6fa738027a16/svn/storm-matte-formica-laminate-sheets-009121258512000-64_400_compressed.jpg" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">{{event["title"]}}</h5>
                          <p class="card-text">{{event["description"]}}</p>
                          <a v-bind:href="event['url']" class="btn btn-primary">Read more</a>
                        </div>
                      </div>
                    </div>
                  
                  </div>
<hr>
                  <div class="row" v-if="!cardLoading">
                    <div class="col-sm-6">
                      <h3>Visiting Centers</h3>
                      <div v-bind:id="'carousel' + pindex" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item" v-for="(vc, index) in visitingCenters" :class="{ 'active': index === 0 }" v-bind:key="'vc'+index">
                            <img class="d-block w-100" src="https://images.homedepot-static.com/productImages/0b10f2de-892e-42b7-aed4-6fa738027a16/svn/storm-matte-formica-laminate-sheets-009121258512000-64_400_compressed.jpg" alt="">
                            <div class="carousel-caption d-none d-md-block">
                              <h5>{{vc["name"]}}</h5>
                              <p>{{vc["description"]}}</p>
                            </div>
                          </div>
                        </div>
                        <a class="carousel-control-prev" v-bind:href="'#carousel' + pindex" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" v-bind:href="'#carousel' + pindex" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <h3>Campgrounds</h3>
                      <div v-bind:id="'othercarousel' + pindex" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item" v-for="(cp, index2) in campGrounds" :class="{ 'active': index2 === 0 }" v-bind:key="'cp'+index2">
                            <img class="d-block w-100" src="https://images.homedepot-static.com/productImages/0b10f2de-892e-42b7-aed4-6fa738027a16/svn/storm-matte-formica-laminate-sheets-009121258512000-64_400_compressed.jpg" alt="">
                            <div class="carousel-caption d-none d-md-block">
                              <h5>{{cp["name"]}}</h5>
                              <p>{{cp["description"]}}</p>
                            </div>
                          </div>
                        </div>
                        <a class="carousel-control-prev" v-bind:href="'#othercarousel' + pindex" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" v-bind:href="'#othercarousel' + pindex" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <h3>Latest alerts</h3>
                  <div class="row" v-if="!cardLoading"> 
                    <br>
                    <div v-for="(alert, idx) in alerts" v-bind:key="'alert'+idx">
                      <div
                        class="alert alert-info"
                        role="alert"
                        v-if="alert['category'] === 'Information'"
                      >{{ alert["title"] }} : {{ alert["description"] }}</div>
                      <div
                        class="alert alert-warning"
                        role="alert"
                        v-if="alert['category'] === 'Caution'"
                      >{{ alert["title"] }} : {{ alert["description"] }}</div>
                      <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="alert['category'] === 'Danger'"
                      >{{ alert["title"] }} : {{ alert["description"] }}</div>
                      <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="alert['category'] === 'Park Closure'"
                      >{{ alert["title"] }} : {{ alert["description"] }}</div>
                    </div>
                  </div>
                  <hr>
                  <h3>Map</h3>
                  <div class="row" v-if="!cardLoading">
                    <iframe width="100%" height="400" frameborder="0" style="border:0"
                v-bind:src="'https://www.google.com/maps/embed/v1/place?q='+ coord +'&key=AIzaSyBnCgbAh4JbLSZUGgAfZxLLK_YAw5zgMuk&zoom=13'"
                allowfullscreen></iframe>
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
      cardLoading: true,
      visitingCenters: [],
      campGrounds: [],
      alerts: [],
      articles: [],
      news: [],
      events: [],
      coord: ""
    };
  },
  methods: {
    getInfo: function(pCode, latlng) {
      axios
        .get(
          "https://developer.nps.gov/api/v1/visitorcenters?parkCode=" +
            pCode +
            "&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
        )
        .then(response => {
          this.visitingCenters = response["data"]["data"];
          if (this.visitingCenters.length == 0) {
                this.visitingCenters = [{"name": "No visiting center at this location"}]
              }
          return axios
            .get(
              "https://developer.nps.gov/api/v1/campgrounds?parkCode=" +
                pCode +
                "&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
            )
            .then(nextResponse => {
              this.campGrounds = nextResponse["data"]["data"];
              if (this.campGrounds.length == 0) {
                this.campGrounds = [{"name": "No campgrounds at this location"}]
              }
              return axios
                .get(
                  "https://developer.nps.gov/api/v1/alerts?parkCode=" +
                    pCode +
                    "&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
                )
                .then(alertResponse => {
                  this.alerts = alertResponse["data"]["data"];
                  return axios.get(
                    "https://developer.nps.gov/api/v1/articles?parkCode="+pCode+"&limit=1&start=1&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
                  ).then(articleResponse => {
                    this.articles = articleResponse["data"]["data"];
                    if (this.articles.length == 0) {
                      this.articles = [{"title": "No new articles",
                        "listingdescription": "",
                        "url": "",
                        "listingimage": {"url": "https://images.homedepot-static.com/productImages/0b10f2de-892e-42b7-aed4-6fa738027a16/svn/storm-matte-formica-laminate-sheets-009121258512000-64_400_compressed.jpg"}}]
                    }
                    return axios.get(
                      "https://developer.nps.gov/api/v1/news?parkCode="+pCode+"&limit=1&start=1&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
                    ).then(newsResponse => {
                      this.news = newsResponse["data"]["data"];
                      if (this.news.length == 0) {
                      this.news = [{"title": "No recent news",
                        "abstract": "",
                        "url": "",
                        "image": {"url": "https://images.homedepot-static.com/productImages/0b10f2de-892e-42b7-aed4-6fa738027a16/svn/storm-matte-formica-laminate-sheets-009121258512000-64_400_compressed.jpg"}}]                      
                    }
                    this.events = [{"title": "No events currently",
                    "description": "",
                    "url":""}]
                    this.cardLoading = false;
                    })
                  })
                });
            });
        });
      this.coord = latlng.replace("lat:", "").replace("long:", "");
      this.cardLoading = true;
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
      });
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
      this.filteredResources = this.filteredResources.filter(
        park => park["states"] === this.stateFilter
      );
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
