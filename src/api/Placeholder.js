import axios from "axios";

const config = { baseURL: 'https://picsum.photos' };

export default class Placeholder {
   // Private
   #loader;
   #page = 1;
   #client = axios.create(config);

   // Placeholder construct
   constructor(loader) {
      this.#loader = loader;
      this.limit = 3;
      this.list = [];
   }

   set loading(state) {
      this.#loader.update(s => s = state)
   }

   get page() {
      return this.#page;
   }

   get params() {
      return {
         page: this.page,
         limit: this.limit,
         width: 300,
         height: 300
      }
   }

   /**
    * "Set Limit"
    * Sets the limit of images to fetch and reloads.
    * @returns {Placeholder}
    */
   setLimit(value) {
      this.#page = 1;
      this.limit = value;
      return this.fetch();
   }

   /**
    * "Previous Page"
    * Decrements the current page value and reloads.
    * @returns {Placeholder}
    */
   prevPage() {
      if (this.#page === 1) return this; // Early exit: no pages less than 1
      this.#page--;
      return this.fetch();
   }

   /**
    * "Next Page"
    * Increments the current page value and reloads.
    * @returns {Placeholder}
    */
   nextPage() {
      this.#page++;
      return this.fetch();
   }

   /**
    * "Load"
    * Loads a list of placeholder objects and returns an updated class instance.
    * @returns {Placeholder}
    */
   async fetch() {
      this.loading = true;

      this.list = await this.#client
      .get('/v2/list', { params: this.params })
      .then( response => response.data )
      .catch( console.error );

      this.loading = false;

      return this;
   }
}