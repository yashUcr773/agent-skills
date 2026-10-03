# Firestore emulator for local use. The emulator needs Java, which this image provides.
FROM node:22-slim
RUN apt-get update \
  && apt-get install -y --no-install-recommends default-jre-headless \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g firebase-tools@13
WORKDIR /workspace
CMD ["firebase", "emulators:start", "--only", "firestore", "--project", "demo-fernway"]
