"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/Main.ts
  var { regClass, property } = Laya;
  var Main = class extends Laya.Script {
    onStart() {
      this.count = 1;
      this.drawCard.on(Laya.Event.CLICK, this, this.onLoaded);
      this.lingqu.on(Laya.Event.CLICK, this, this.ReceiveCard);
      this.quxiao.on(Laya.Event.CLICK, this, this.Cancel);
    }
    onLoaded() {
      let animation = new Laya.Animation();
      animation.source = "resources/6-1抽卡按钮/6-1抽卡按钮动态/6-1抽卡按钮动态.atlas";
      animation.pos(268, 1037);
      animation.play();
      this.drawCard.visible = false;
      Laya.stage.addChild(animation);
      animation.loop = false;
      let animation1 = new Laya.Animation();
      animation1.source = "resources/组件-按钮点击光效/组件-按钮点击光效.atlas";
      animation1.pos(-135, 570);
      animation1.play();
      Laya.stage.addChild(animation1);
      animation1.loop = false;
      animation1.on(Laya.Event.COMPLETE, this, this.DrawCardAnim);
      animation1.on(Laya.Event.COMPLETE, this, () => {
        animation.destroy();
        animation1.destroy();
      });
    }
    //抽卡前摇
    DrawCardAnim() {
      let choukaqianyaoAnim = new Laya.Animation();
      choukaqianyaoAnim.source = "resources/1-2-抽卡前摇动画/1-2抽卡前摇动画.atlas";
      choukaqianyaoAnim.pos(0, 0);
      choukaqianyaoAnim.play();
      choukaqianyaoAnim.loop = false;
      Laya.stage.addChild(choukaqianyaoAnim);
      choukaqianyaoAnim.interval = 50;
      choukaqianyaoAnim.on(Laya.Event.COMPLETE, this, () => {
        let choukajieguoAnim = new Laya.Animation();
        choukajieguoAnim.autoPlay = true;
        choukajieguoAnim.source = "resources/" + (this.count + 1) + "-1-抽卡结果" + this.count + "/choukajieguo" + this.count + ".atlas";
        this.count += 1;
        choukajieguoAnim.pos(0, 0);
        choukajieguoAnim.play();
        Laya.stage.addChild(choukajieguoAnim);
        choukajieguoAnim.loop = false;
        this.RoleDisplay(choukaqianyaoAnim, choukajieguoAnim);
      });
    }
    RoleDisplay(choukaqianyaoAnim, choukajieguoAnim) {
      choukajieguoAnim.on(Laya.Event.COMPLETE, this, () => {
        choukaqianyaoAnim.source = null;
        this.ShowMain(choukajieguoAnim);
      });
    }
    //回到主页
    ShowMain(choukajieguoAnim) {
      choukajieguoAnim.source = null;
      this.drawCard.visible = true;
      if (this.count == 2) {
        this.Card1.skin = "resources/5-3小卡显示1/小卡1.png";
        this.select1.skin = "resources/5-2小卡下方按钮/选择按钮-亮.png";
        let animation = new Laya.Animation();
        animation.source = "resources/5-1小卡出现光效/5-1小卡出现光效.atlas";
        animation.pos(101, 700);
        animation.scale(0.44, 0.647);
        animation.play();
        Laya.stage.addChild(animation);
        animation.loop = false;
      } else if (this.count == 3) {
        this.Card2.skin = "resources/5-4小卡显示2/小卡2.png";
        this.select2.skin = "resources/5-2小卡下方按钮/选择按钮-亮.png";
        let animation = new Laya.Animation();
        animation.source = "resources/5-1小卡出现光效/5-1小卡出现光效.atlas";
        animation.pos(280, 700);
        animation.scale(0.44, 0.647);
        animation.play();
        Laya.stage.addChild(animation);
        animation.loop = false;
      } else {
        this.drawCard.off(Laya.Event.CLICK, this, this.onLoaded);
        this.Card3.skin = "resources/5-5小卡显示3/小卡3.png";
        this.select3.skin = "resources/5-2小卡下方按钮/选择按钮-亮.png";
        let animation = new Laya.Animation();
        animation.source = "resources/5-1小卡出现光效/5-1小卡出现光效.atlas";
        animation.pos(470, 700);
        animation.scale(0.44, 0.647);
        animation.play();
        Laya.stage.addChild(animation);
        animation.loop = false;
        this.select1.on(Laya.Event.CLICK, this, () => {
          this.ReceiveCardTip(1);
        });
        this.select2.on(Laya.Event.CLICK, this, () => {
          this.ReceiveCardTip(2);
        });
        this.select3.on(Laya.Event.CLICK, this, () => {
          this.ReceiveCardTip(3);
        });
      }
    }
    ReceiveCardTip(num) {
      this.Tip.visible = true;
      switch (num) {
        case 1:
          this.img.skin = "resources/5-3小卡显示1/小卡1.png";
          break;
        case 2:
          this.img.skin = "resources/5-4小卡显示2/小卡2.png";
          break;
        case 3:
          this.img.skin = "resources/5-5小卡显示3/小卡3.png";
          break;
        default:
          break;
      }
    }
    ReceiveCard() {
      let animation = new Laya.Animation();
      animation.source = "resources/组件-按钮点击光效/组件-按钮点击光效.atlas";
      animation.pos(-41, 343);
      animation.play();
      Laya.stage.addChild(animation);
      animation.loop = false;
      animation.on(Laya.Event.COMPLETE, this, this.Close);
    }
    Cancel() {
      this.Tip.visible = false;
    }
    Close() {
      this.Tip.visible = false;
      let animation = new Laya.Animation();
      animation.source = "resources/组件-最后领取成功UI/组件-最后领取成功UI.atlas";
      animation.pos(0, 0);
      animation.play();
      Laya.stage.addChild(animation);
      animation.loop = false;
    }
  };
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "TF", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "drawCard", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "Card1", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "Card2", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "Card3", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "select1", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "select2", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "select3", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "Tip", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "img", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "lingqu", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], Main.prototype, "quxiao", 2);
  Main = __decorateClass([
    regClass("e60XQm7tTY2BwFAdxb8D1g")
  ], Main);
})();
