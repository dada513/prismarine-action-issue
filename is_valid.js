const pkgJson = require("./package.json");
const { createActionAuth } = require("@octokit/auth-action");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  authStrategy: createActionAuth,
});

module.exports = async (owner, repo, number) => {
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: [
      `*bot* - [prismarine-action-issue](https://github.com/dada513/prismarine-action-issue) - v${pkgJson.version}`,
      "Thank you for filling in the template 🎉",
    ].join("\n"),
  });
  await octokit.issues.addLabels({
    owner,
    repo,
    issue_number: number,
    labels: ["valid"],
  });

  await octokit.issues.update({
    owner,
    repo,
    issue_number: number,
    state: "open",
  });
};
