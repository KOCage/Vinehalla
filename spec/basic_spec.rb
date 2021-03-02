require "basic/basic"

RSpec.describe 'Testing the basic class' do
    context 'testing the return methods' do
        it 'ReturnFour returns the number 4' do
            # arrange
            basic = Basic.new             
            # act
            num = basic.ReturnFour
            # assert
            expect(num).to(eq(4))
        end

        it 'ReturnHello returns the string "Hello"' do
            # arrange
            basic = Basic.new
            # act
            str = basic.ReturnHello
            # assert
            expect(str).to(eq("Hello"))
        end
    end
end