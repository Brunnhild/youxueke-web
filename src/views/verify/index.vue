<template>
  <div>
  <course-list :course-list="courseData"></course-list>
  </div>
</template>

<script>
  import courseList from '@/components/course-list'

  import utils from '@/utils'

  export default {
    name: "index",
    components: { courseList },
    data: () => ({
      courseData: [
          {
              id: 1,
              title: '操作系统',
              trueName: '张同学',
              location: '理科大楼',
              date: '2019-12-12',
              verification: false,
              img:'../assets/logo.png',
              des:'速度滑冰  三人同行染色体和 素人特工任务提供'
          },
          {
              id: 1,
              title: '操作系统',
              trueName: '张同学',
              location: '理科大楼',
              date: '2019-12-13',
              verification: false,
              img:'../assets/logo.png',
              des:'速度滑冰  三人同行染色体和 素人特工任务提供'
          }
    ]
    }),
    // mounted () {
    //   utils.request({
    //     invoke: utils.api.allCourse
    //   })
    //     .then(res => {
    //       this.courseData = res.Course.filter(item => !item.verification)
    //     })
    // }
  }
</script>

<style scoped>

</style>
