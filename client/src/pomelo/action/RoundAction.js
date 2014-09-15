/**
 * RoundAction.js
 * 用户的相关 action
 * Created by long on 2014/9/1.
 */
var RoundAction = {
    /**
     * 开桌
     * 
     */
    newRound: function(roomId){

      var userIds = RoomList.getUserIdsByRoomId(roomId);
      var bankIndex = 0// _.random(2);
      var round = Round.createNew(userIds, bankIndex);
      RoomList.setRound(roomId, round);

      var cards;
      _.each(userIds, function(userId){
        cards = round.getCardsByUserId(userId);

        // 开局发牌
        var newRoundEvent = {
          cmd:CardUtil.ServerNotify.onNewRound,
          data:{
            cards: cards,
            userId: userId
          }
        };
        ServerNotifyManager.sendCmdResponse(newRoundEvent);

      });




      var bankId = round.getBankerId();
      var banker = RoomList.getUserByUserId(bankId);
      //启动ai
      FightAIAction.onDisCardAction(round,banker.userId)
    },



    /**
     * 当我从手中出了一张牌后 ，看我的操作
     * 判断是否能自动杠，自动偎，自动跑
     * 跑胡子规则 ： http://www.80166.com/help/phz.shtml
     * @param roomId
     * @param userId
     * @param cardId
     */
    newDisardByMyHand: function(roomId, userId, cardId){
        /**
         * todo-long
         * 1:获取出上家  下家 （这里可以在round中抽取出两个方法，通过一个userId分别获取上家下家）
         * 2：判断下家是否可以自动跑，碰，吃，无操作
         * 3：判断下下家，即上家是否可以跑，碰，吃，无操作
         * 4：如果任何一家有跑的操作，直接 ServerNotifyManager-》CardUtil.ServerNotify.onPao （跑有三种情况，一种是我手上三张牌跑，一种是我桌面畏的牌跑，一种是桌面碰的牌跑）
         *    并返回true标示符
         * 5：否则返回false标示符
         */
        var round = RoomList.getRound(roomId);
        var previousPlayer;
        var nextPlayer;
        if(nextPlayer){

        }


        //结果
        var canPao = false;
        if(canPao){
            var newRoundEvent = {
                cmd:CardUtil.ServerNotify.onPao,
                data:{
                    cardId: cardId,
                    paoType:0,//跑的类型
                    userId: nextPlayer.userId
                }
            };
            ServerNotifyManager.sendCmdResponse(newRoundEvent);
            return
        }

        return false
    }
};