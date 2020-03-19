<template>
  <div class="about">
    <h1 class="about__title">About Streetview Mapper</h1>
    <div class="about__content">
      <p class="about__content-paragraph">
        Hello there fellow Streetview Mapper!
      </p>
      <p class="about__content-paragraph">
        <span class="bold">Streetview Mapper</span> is a simple tool to allow
        curious mappers (like you!) to take «snapshots» of the world through
        Google Streetview. These snapshots are stored in a database to allow
        users to revisit what things they've found remarkable, noteworthy,
        strange, weird, compelling, and interesting.
      </p>
      <p class="about__content-paragraph">
        This is a project by
        <span class="bold"
          ><a href="https://jk-lee.com" target="_blank">Joey Lee</a></span
        >
        built during the 2020 covid-19 pandemic.
      </p>
      <p class="about__content-paragraph">
        For his course
        <span class="bold"
          ><a href="https://all-maps-lie-2020.netlify.com/#/" target="_blank"
            >«All Maps Lie»</a
          ></span
        >
        at New York University's Interactive Telecommunication Program (ITP),
        Joey's students were supposed to perform their own «Data Walks»,
        physically collecting data about the urban environment and
        infrastructure. However given the need to stay indoors, it was necessary
        to find other mechanisms to observe the world, explore spatial media,
        and practice paying attention. This tool was developed out of this need
        to provide other ways to explore and observe the world.
      </p>

      <p class="about__content-paragraph">
        To learn more about the project <br />
        →
        <span class="bold"
          ><a href="https://learn.streetview-mapper.org" target="_blank"
            >learn.streetview-mapper.org</a
          ></span
        >
      </p>
      <p class="about__content-paragraph">
        Please report bugs or issues on Github. Thank you! <br />
        →
        <span class="bold"
          ><a
            href="https://github.com/joeyklee/streetview-mapper-docs/issues"
            target="_blank"
            >joeyklee/streetview-mapper-docs</a
          ></span
        >.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 auto;
  max-width: 600px;

  &__title {
    margin-bottom: 2rem;
    text-align: left;
    width: 100%;
  }

  &__content {
    width: 100%;

    &-paragraph {
      line-height: 1.6;
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
      letter-spacing: 0.08ch;
      font-weight: 300;

      .bold {
        font-weight: 500;
      }
    }
  }
}
</style>
