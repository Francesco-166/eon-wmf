<template>
  <nav class="navigation">
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <a> Arztbrief </a>
        <ul class="nav-dropdown">
          <li>
            <a href="https://www.eservicet-drv.de/klinik_web/login.html">
              Arztbrief-Generator (externer Link)</a
            >
            <!-- <RouterLink to="/arztbrief-backend">Backend</RouterLink> -->
          </li>
          <!-- <li>
            <RouterLink to="/arztbrief-feedback">Feedback</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/arztbrief-summarizer">Zusammenfassung</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink to="/anamnese-generator">Anamnese-Generator</RouterLink>
      </li>
      <li>
        <a href="https://demo-ui.1dp3xfijfbm1.eu-de.codeengine.appdomain.cloud"> Anonymizer</a>
        <!-- <RouterLink to="/anonymizer">Anonymizer</RouterLink> -->
      </li>
      <li>
        <RouterLink to="/pflegegutachten">Pflegegutachten</RouterLink>
      </li>
    </ul>
  </nav>
</template>
