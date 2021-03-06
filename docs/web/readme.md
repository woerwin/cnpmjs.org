# cnpmjs.org: Private npm registry and web for Enterprise

[![Build Status](https://secure.travis-ci.org/fengmk2/cnpmjs.org.png)](http://travis-ci.org/fengmk2/cnpmjs.org) [![Coverage Status](https://coveralls.io/repos/fengmk2/cnpmjs.org/badge.png)](https://coveralls.io/r/fengmk2/cnpmjs.org)

[![NPM](https://nodei.co/npm/cnpmjs.org.png?downloads=true&stars=true)](https://nodei.co/npm/cnpmjs.org/)

## What is this?

> Private npm registry and web for Enterprise, base on MySQL and Simple File Store.

@[JacksonTian](https://github.com/JacksonTian/) had a talk about [private npm](https://speakerdeck.com/jacksontian/qi-ye-ji-node-dot-jskai-fa).

## Install your private npm registry

@see [Install and Get Started](/install).

## Registry

* Our public registry: [registry.cnpmjs.org](http://registry.cnpmjs.org)
* Current [cnpmjs.org](/) version: <span id="app-version"></span>

Total Packages: <span id="total-packages"></span>

<table class="downloads">
  <tbody>
    <tr>
      <td class="count"></td><td> downloads today</td>
      <td class="count"></td><td> downloads in this week</td>
      <td class="count"></td><td> downloads in this month</td>
    </tr>
    <tr>
      <td class="count"></td><td> downloads in the last day</td>
      <td class="count"></td><td> downloads in the last week</td>
      <td class="count"></td><td> downloads in the last month</td>
    </tr>
  </tbody>
</table>

Running on [Node.js](http://nodejs.org), version <span id="node-version"></span>.

<script>
$(function () {
  function humanize(n, options) {
    options = options || {};
    var d = options.delimiter || ',';
    var s = options.separator || '.';
    n = n.toString().split('.');
    n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + d);
    return n.join(s);
  }

  $.getJSON('http://registry.cnpmjs.org/?callback=?', function (data) {
    $('#total-packages').html(humanize(data.doc_count));
    var downloads = $('table.downloads');
    downloads.find('td.count:eq(0)').html(humanize(data.download.today));
    downloads.find('td.count:eq(1)').html(humanize(data.download.thisweek));
    downloads.find('td.count:eq(2)').html(humanize(data.download.thismonth));
    downloads.find('td.count:eq(3)').html(humanize(data.download.lastday));
    downloads.find('td.count:eq(4)').html(humanize(data.download.lastweek));
    downloads.find('td.count:eq(5)').html(humanize(data.download.lastmonth));

    $('#node-version').html(data.node_version || 'v0.10.22');
    $('#app-version').html(data.app_version || '0.0.0');
  });
});
</script>

## cnpm cli

alias it:

```bash
alias cnpm="npm --registry=http://registry.cnpmjs.org --cache=$HOME/.npm/.cache/cnpm"

#Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=http://registry.cnpmjs.org \
  --cache=$HOME/.npm/.cache/cnpm"' >> ~/.zshrc && source ~/.zshrc
```

Or you can just use our `cnpm` cli:

```bash
$ npm install cnpm -g
```

### adduser

```bash
$ cnpm adduser
```

### sync

Only `cnpm` cli has this command:

```bash
$ cnpm sync mocha
```

(TODO) sync package web page

```bash
$ open http://cnpmjs.org/sync
```

### publish

Meaning sync package from source npm.

Only `admin` user can publish package to private registry.

```bash
$ cnpm publish [name]
```

## TODO list

@see Github [Issues](https://github.com/fengmk2/cnpmjs.org/issues)

## Authors

```bash
$ git summary

 project  : cnpmjs.org
 repo age : 8 days
 active   : 47 days
 commits  : 118
 files    : 69
 authors  :
    69  fengmk2                 58.5%
    49  dead_horse              41.5%
```

## npm and cnpm relation

![npm&cnpm](https://docs.google.com/drawings/d/12QeQfGalqjsB77mRnf5Iq5oSXHCIUTvZTwECMonqCmw/pub?w=960&h=720)

## 捐赠 Donate
如果您觉得 [cnpmjs.org] 对您有帮助，欢迎请作者一杯咖啡.

[![Donate](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/imk2)

 [cnpmjs.org]: http://cnpmjs.org/
 [registry.cnpmjs.org]: http://registry.cnpmjs.org/
