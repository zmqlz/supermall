<template>
  <div id="category" class="wrapper">
    <div class="content">
      <ul>
        <li>罗颖1</li>
        <li>罗颖2</li>
        <li>罗颖3</li>
        <li>罗颖4</li>
        <li>罗颖5</li>
        <li>罗颖6</li>
        <li>罗颖7</li>
        <li>罗颖8</li>
        <li>罗颖9</li>
        <li>罗颖10</li>
        <li>罗颖11</li>
        <li>罗颖12</li>
        <li>罗颖13</li>
        <li>罗颖14</li>
        <li>罗颖15</li>
        <li>罗颖16</li>
        <li>罗颖17</li>
        <li>罗颖18</li>
        <li>罗颖19</li>
        <li>罗颖20</li>
        <li>罗颖21</li>
        <li>罗颖22</li>
        <li>罗颖23</li>
        <li>罗颖24</li>
        <li>罗颖25</li>
        <li>罗颖26</li>
        <li>罗颖27</li>
        <li>罗颖28</li>
        <li>罗颖29</li>
        <li>罗颖30</li>
        <li>罗颖31</li>
        <li>罗颖32</li>
        <li>罗颖33</li>
        <li>罗颖34</li>
        <li>罗颖35</li>
        <li>罗颖36</li>
        <li>罗颖37</li>
        <li>罗颖38</li>
        <li>罗颖39</li>
        <li>罗颖40</li>
        <li>罗颖41</li>
        <li>罗颖42</li>
        <li>罗颖43</li>
        <li>罗颖44</li>
        <li>罗颖45</li>
        <li>罗颖46</li>
        <li>罗颖47</li>
        <li>罗颖48</li>
        <li>罗颖49</li>
        <li>罗颖50</li>
        <li>罗颖51</li>
        <li>罗颖52</li>
        <li>罗颖53</li>
        <li>罗颖54</li>
        <li>罗颖55</li>
        <li>罗颖56</li>
        <li>罗颖57</li>
        <li>罗颖58</li>
        <li>罗颖59</li>
        <li>罗颖60</li>
        <li>罗颖61</li>
        <li>罗颖62</li>
        <li>罗颖63</li>
        <li>罗颖64</li>
        <li>罗颖65</li>
        <li>罗颖66</li>
        <li>罗颖67</li>
        <li>罗颖68</li>
        <li>罗颖69</li>
        <li>罗颖70</li>
        <li>罗颖71</li>
        <li>罗颖72</li>
        <li>罗颖73</li>
        <li>罗颖74</li>
        <li>罗颖75</li>
        <li>罗颖76</li>
        <li>罗颖77</li>
        <li>罗颖78</li>
        <li>罗颖79</li>
        <li>罗颖80</li>
        <li>罗颖81</li>
        <li>罗颖82</li>
        <li>罗颖83</li>
        <li>罗颖84</li>
        <li>罗颖85</li>
        <li>罗颖86</li>
        <li>罗颖87</li>
        <li>罗颖88</li>
        <li>罗颖89</li>
        <li>罗颖90</li>
        <li>罗颖91</li>
        <li>罗颖92</li>
        <li>罗颖93</li>
        <li>罗颖94</li>
        <li>罗颖95</li>
        <li>罗颖96</li>
        <li>罗颖97</li>
        <li>罗颖98</li>
        <li>罗颖99</li>
        <li>罗颖100</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScorll from "better-scroll"

  export default {
    name: "Category",
    data() {
      return{
        scroll:null
      }
    },
    mounted() {
      // console.log(document.getSelection(".wrapper"))
      this.scroll=new BScorll(document.querySelector(".wrapper"),{

      })
    }
  }
</script>

<style scoped>
#category{
  height: 150px;
  background-color: deeppink;
}
</style>
