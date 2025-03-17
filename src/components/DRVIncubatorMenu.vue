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
      <!-- <li>
        <a href="https://demo-ui.1dp3xfijfbm1.eu-de.codeengine.appdomain.cloud"> Anonymizer</a>
      </li> -->
      <li>
        <a> Patientenübersicht </a>
        <ul class="nav-dropdown">
          <li>
            <a
              href="https://patient-summary-route-mla.ohpdemo01-990e7b837f1894cb67c000b2ea26e354-0000.eu-de.containers.appdomain.cloud/#/cp-dashboard/0000-0001"
            >
              Patientenübersicht (externer Link)</a
            >
          </li>
          <li>
            <RouterLink to="/patienten-uebersicht">Patientenübersicht</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink to="/pflegegutachten">Pflegegutachten</RouterLink>
      </li>
    </ul>
  </nav>
</template>
